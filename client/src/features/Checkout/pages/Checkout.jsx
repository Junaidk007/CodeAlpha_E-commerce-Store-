import { useEffect } from "react";
import CheckOutCard from "../components/CheckOutCard";
import PriceDetailCard from "../components/PriceDetailCard";
import "./Checkout.css";
import useAuth from "../../../hooks/useAuth.js";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart.js";
import useGlobal from '../../../hooks/useGlobal.js';

function Checkout() {
    const { token } = useAuth();
    const { cart, fetchCart, updateCartItem, removeFromCart } = useCart();
    const { setToast } = useGlobal();

    // Fetch the cart from the backend when this page first loads
    useEffect(() => {
        fetchCart();
    }, []);

    // Called when the user changes quantity on a cart item
    // This calls the backend API (not just local state) so changes persist on refresh
    const handleQuantityChange = async (item, newQty) => {
        await updateCartItem(item, newQty);
    };

    // Called when the user clicks the trash icon on a cart item
    // This calls the backend API to actually remove the item from the DB
    const handleRemove = async (item) => {
        await removeFromCart(item);
    };

    const handleCheckout = () => {
        setToast({ message: "Order placed successfully! Thank you for shopping.", success: true });
    };

    // Calculate the bag total:
    // item.price is stored as the UNIT price (price for 1 item)
    // We multiply by quantity here on the frontend
    const bagTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Simple discount logic: ₹500 off for orders over ₹2000, ₹200 off for orders over ₹1000
    const productDiscount = bagTotal > 2000 ? 500 : (bagTotal > 1000 ? 200 : 0);

    // ─── Guard: user not logged in ────────────────────────────────────────────
    if (!token) {
        return (
            <div className="checkout-empty-container" style={{ padding: "100px 20px", textAlign: "center", minHeight: "50vh" }}>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "12px", color: "#111" }}>Please Login to Continue</h2>
                <p style={{ color: "#666", marginBottom: "24px" }}>Login to your account to continue shopping.</p>
                <Link
                    to="/account/auth"
                    style={{ display: "inline-block", padding: "12px 28px", background: "#111", color: "#fff", textDecoration: "none", borderRadius: "4px", fontSize: "0.9rem", letterSpacing: "1px" }}
                >
                    Login
                </Link>
            </div>
        );
    }

    // ─── Guard: cart is empty ─────────────────────────────────────────────────
    if (!cart || cart.length === 0) {
        return (
            <div className="checkout-empty-container" style={{ padding: "80px 20px", textAlign: "center", minHeight: "50vh" }}>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "12px", color: "#111" }}>Your Shopping Bag is Empty</h2>
                <p style={{ color: "#666", marginBottom: "24px" }}>Browse our minimalist collections and add items to your cart.</p>
                <a href="/" style={{ display: "inline-block", padding: "12px 28px", background: "#111", color: "#fff", textDecoration: "none", borderRadius: "4px", fontSize: "0.9rem", letterSpacing: "1px" }}>
                    CONTINUE SHOPPING
                </a>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-items-container">
                {cart.map((item, index) => (
                    <CheckOutCard
                        key={`${item.product?._id || item.product}-${item.size}-${item.color?.name}-${index}`}
                        product={{
                            // After populate(), the product name lives at item.product.title
                            name: item.product?.title || "Product",
                            price: item.price,         // unit price — CheckOutCard multiplies by qty
                            image: item.image || "",
                            size: item.size || "N/A",
                            // color is stored as { name, hex } — display just the name string
                            color: item.color?.name || "N/A",
                            quantity: item.quantity || 1,
                            stock: item.stock || 10,
                        }}
                        onRemove={() => handleRemove(item)}
                        onQuantityChange={(qty) => handleQuantityChange(item, qty)}
                    />
                ))}
            </div>
            <div className="checkout-price-container">
                <PriceDetailCard bagTotal={bagTotal} productDiscount={productDiscount} onCheckout={handleCheckout} />
            </div>
        </div>
    );
}

export default Checkout;