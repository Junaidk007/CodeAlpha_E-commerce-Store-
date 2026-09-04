import React from "react";
import QuantityAdjuster from "../../ProductDetail/components/QuantityAdjuster";
import "./CheckOutCard.css";

// CheckOutCard displays a single item in the checkout/cart page.
//
// Props:
//   product  — object with: { name, price, image, size, color, quantity, stock }
//   onRemove — called with no args when the trash button is clicked
//   onQuantityChange — called with (newQty) when quantity changes
function CheckOutCard({ product, onRemove, onQuantityChange }) {

    // image can be a string URL or an object like { url, filename } from Cloudinary
    const imgSrc = typeof product.image === "object" ? product.image?.url : product.image;

    return (
        <div className="checkout-card-wrapper">
            <div className="checkout-card-image-container">
                <img src={imgSrc} alt={product.name} className="checkout-card-img" />
            </div>
            <div className="checkout-card-content">
                <div className="checkout-card-top">
                    <div className="checkout-card-info">
                        <h2>{product.name}</h2>

                        <div className="checkout-card-meta">
                            <span>{product.size}</span>
                            <span className="meta-separator">|</span>
                            <span>{product.color}</span>
                            <span className="meta-separator">|</span>
                            <span className="meta-qty-label">QTY: {product.quantity}</span>
                        </div>

                        {/* QuantityAdjuster calls onQuantityChange(newQty) directly */}
                        <QuantityAdjuster
                            quantity={product.quantity}
                            stock={product.stock}
                            onChange={(qty) => onQuantityChange && onQuantityChange(qty)}
                        />
                    </div>
                    <div className="checkout-card-remove-container">
                        <button
                            className="checkout-remove-btn"
                            onClick={() => onRemove && onRemove()}
                            aria-label="Remove item"
                        >
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div className="checkout-card-bottom">
                    {/* Unit price × quantity = line total */}
                    <p className="checkout-card-price">
                        ₹{product.price * product.quantity}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CheckOutCard;