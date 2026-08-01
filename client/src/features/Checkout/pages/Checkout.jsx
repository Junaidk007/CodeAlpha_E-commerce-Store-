import CheckOutCard from "../components/CheckOutCard";
import PriceDetailCard from "../components/PriceDetailCard";
import { useCart } from "../../../hooks";
import "./Checkout.css";

function Checkout() {
    const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (item, newQty) => {
        const itemId = item._id || item.product;
        const colorName = item.color?.name || item.color;
        updateQuantity(itemId, colorName, item.size, newQty);
    };

    const handleRemove = (item) => {
        const itemId = item._id || item.product;
        const colorName = item.color?.name || item.color;
        removeFromCart(itemId, colorName, item.size);
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="checkout-empty-container" style={{ padding: "40px", textAlign: "center" }}>
                <h2>Your Shopping Bag is Empty</h2>
                <p>Browse our products and add items to your cart.</p>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-items-container">
                {cartItems.map((item, index) => (
                    <CheckOutCard
                        key={index}
                        product={{
                            id: item._id || item.product,
                            name: item.title || "Product",
                            price: item.price || 0,
                            image: item.image || "",
                            size: item.size || "N/A",
                            color: typeof item.color === "object" ? item.color.name : item.color || "N/A",
                            quantity: item.quantity || 1,
                        }}
                        onRemove={() => handleRemove(item)}
                        onQuantityChange={(id, qty) => handleQuantityChange(item, qty)}
                    />
                ))}
            </div>
            <div className="checkout-price-container">
                <PriceDetailCard bagTotal={cartTotal} productDiscount={0} />
            </div>
        </div>
    );
}

export default Checkout;