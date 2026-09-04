import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import useGlobal from "../hooks/useGlobal";
import { getCart, addToCart, updateCart, deleteCartItem } from "../service/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { loading, setLoading, setToast } = useGlobal();
    const { token } = useAuth();

    // `cart` is the array of cart items (each item has product, size, color, quantity, price, etc.)
    const [cart, setCart] = useState([]);

    // `cartCount` is the total number of items (used for the navbar badge)
    const [cartCount, setCartCount] = useState(0);

    // ─── Helper: update both cart state and count from an API response ───────────
    // Every API call returns the full updated cart — we always sync state from it
    const syncCartState = (cartData) => {
        setCart(cartData.items || []);
        setCartCount(cartData.totalCount || 0);
    };

    // ─── FETCH ───────────────────────────────────────────────────────────────────
    // Called when the Checkout page loads to get the user's current cart from the DB
    const fetchCart = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await getCart(token);
            syncCartState(response.data.data);
        } catch (error) {
            setToast({ message: error?.response?.data?.message || "Failed to fetch cart", success: false });
        } finally {
            setLoading(false);
        }
    };

    // ─── ADD ─────────────────────────────────────────────────────────────────────
    // Called from ProductDetail when user clicks "ADD TO BAG"
    const addCart = async (cartData) => {
        if (!token) {
            setToast({ message: "Please login to add items to cart", type: "error" });
            return;
        }
        setLoading(true);
        try {
            const response = await addToCart(token, cartData);
            syncCartState(response.data.data);
            setToast({ message: "Item added to cart", success: response.data.success });
        } catch (error) {
            setToast({ message: error?.response?.data?.message || "Failed to add item", success: false });
        } finally {
            setLoading(false);
        }
    };

    // ─── UPDATE QUANTITY ─────────────────────────────────────────────────────────
    // Called from Checkout when user changes item quantity
    // `item` is the full cart item object (has .product._id, .size, .color)
    // `quantity` is the new quantity number
    const updateCartItem = async (item, quantity) => {
        setLoading(true);
        try {
            const payload = {
                productId: item.product?._id || item.product,  // handle both populated & unpopulated
                quantity,
                size: item.size,
                color: item.color,  // { name, hex }
            };
            const response = await updateCart(token, payload);
            syncCartState(response.data.data);
            setToast({ message: "Quantity updated", success: true });
        } catch (error) {
            setToast({ message: error?.response?.data?.message || "Failed to update item", success: false });
        } finally {
            setLoading(false);
        }
    };

    // ─── REMOVE ───────────────────────────────────────────────────────────────────
    // Called from Checkout when user clicks the trash icon
    // `item` is the full cart item object
    const removeFromCart = async (item) => {
        setLoading(true);
        try {
            const payload = {
                productId: item.product?._id || item.product,
                size: item.size,
                color: item.color,  // { name, hex }
            };
            const response = await deleteCartItem(token, payload);
            syncCartState(response.data.data);
            setToast({ message: "Item removed from bag", success: true });
        } catch (error) {
            setToast({ message: error?.response?.data?.message || "Failed to remove item", success: false });
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, cartCount, addCart, fetchCart, updateCartItem, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};