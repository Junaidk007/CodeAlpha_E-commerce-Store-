import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { fetchCart, updateCart as updateCartApi, deleteCartItem as deleteCartApi } from "../services/apiCalls";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync cart items with localStorage for persistence
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  // Fetch cart from backend API
  const loadCart = useCallback(async (authToken) => {
    const token = authToken || localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetchCart(token);
      if (response && response.data && Array.isArray(response.data.items)) {
        const formattedItems = response.data.items.map((item) => {
          const prod = typeof item.product === "object" ? item.product : {};
          const variant = prod.variants.find(
            (variant) => variant.color.name === item.color.name
          );

          const sizeData = variant?.sizes.find(
            (s) => s.size === item.size
          );
          const currentStock = sizeData?.stock ?? 0;    
          return {
            _id: prod._id || item.product,
            product: prod._id || item.product,
            title: prod.title || "Product",
            price: prod.price || 0,
            quantity: item.quantity || 1,
            size: item.size,
            color: item.color,
            image: item.image || prod.variants?.[0]?.images?.[0] || "",
            stock: currentStock || 0,
          };
        });
        setCartItems(formattedItems);
      }
    } catch (e) {
      console.error("Error fetching cart from backend:", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync with backend on initial load if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadCart(token);
    }
  }, [loadCart]);

  const addToCart = useCallback((newItem) => {
    setCartItems((prevItems) => {
      // Find matching item based on product ID, color, and size
      const existingIndex = prevItems.findIndex(
        (item) =>
          (item._id || item.product) === (newItem._id || newItem.product) &&
          item.color?.name === newItem.color?.name &&
          item.size === newItem.size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (newItem.quantity || 1),
        };
        return updated;
      }

      return [...prevItems, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  }, []);

  const removeFromCart = useCallback(async (itemId, colorName, size, authToken) => {
    // Optimistically update local cart state
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !((item._id || item.product) === itemId &&
            (colorName ? (item.color?.name || item.color) === (typeof colorName === "object" ? colorName.name : colorName) : true) &&
            (size ? item.size === size : true))
      )
    );

    // Call backend API if user is authenticated
    const token = authToken || localStorage.getItem("token");
    if (token) {
      try {
        await deleteCartApi(
          {
            productId: itemId,
            size,
            color: typeof colorName === "string" ? { name: colorName } : colorName,
          },
          token
        );
      } catch (e) {
        console.error("Error removing item from cart on backend:", e.message);
      }
    }
  }, []);

  const updateQuantity = useCallback(async (itemId, colorName, size, quantity, authToken) => {
    if (quantity <= 0) {
      removeFromCart(itemId, colorName, size);
      return;
    }

    // Optimistically update local context state
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (
          (item._id || item.product) === itemId &&
          item.color?.name === colorName &&
          item.size === size
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );

    // Call backend API if user is authenticated
    const token = authToken || localStorage.getItem("token");
    if (token) {
      try {
        await updateCartApi(
          {
            productId: itemId,
            quantity,
            size,
            color: typeof colorName === "string" ? { name: colorName } : colorName,
          },
          token
        );
      } catch (e) {
        console.error("Error updating cart on backend:", e.message);
      }
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Compute total item count efficiently
  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cartItems]);

  // Compute total price efficiently
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.price || item.product?.price || 0;
      return total + price * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  // Memoize value to optimize rendering performance for components consuming cart state
  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      loading,
      loadCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setCartItems,
    }),
    [cartItems, cartCount, cartTotal, loading, loadCart, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
