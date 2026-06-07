import React from "react";
import QuantityAdjuster from "../../ProductDetail/components/QuantityAdjuster";
import poloT from "../../../assets/products/poloT.webp";
import "./CheckOutCard.css";

function CheckOutCard({ product = {}, onRemove, onQuantityChange }) {
    // Default mockup details matching the polo shirt reference image
    const defaultProduct = {
        id: 7,
        name: "Contrast Tipping Zipper Polo T-Shirt",
        price: 1299,
        image: poloT,
        size: "S",
        color: "Green",
        quantity: 1
    };

    const currentProduct = { ...defaultProduct, ...product };

    return (
        <div className="checkout-card-wrapper">
            <div className="checkout-card-image-container">
                <img src={currentProduct.image} alt={currentProduct.name} className="checkout-card-img" />
            </div>
            <div className="checkout-card-content">
                <div className="checkout-card-top">
                    {/* top part  */}
                    <div className="checkout-card-info">
                        {/* right side  */}
                        <h2>{currentProduct.name}</h2>
                        
                        <div className="checkout-card-meta">
                            <span>{currentProduct.size}</span>
                            <span className="meta-separator">|</span>
                            <span>{currentProduct.color}</span>
                            <span className="meta-separator">|</span>
                            <span className="meta-qty-label">QTY: {currentProduct.quantity}</span>
                        </div>

                        <QuantityAdjuster 
                            quantity={currentProduct.quantity} 
                            onChange={(qty) => onQuantityChange && onQuantityChange(currentProduct.id, qty)} 
                        />
                    </div>
                    <div className="checkout-card-remove-container">
                        {/* left side */}
                        <button className="checkout-remove-btn" onClick={() => onRemove && onRemove(currentProduct.id)} aria-label="Remove item">
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div className="checkout-card-bottom">
                    {/* bottom part  */}
                    <p className="checkout-card-price">
                        {/* price will be shown on right corrner */}
                        ₹{currentProduct.price}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CheckOutCard;