import React from "react";
import "./PriceDetailCard.css";

function PriceDetailCard({ 
    bagTotal = 3098, 
    productDiscount = 540,
    onCheckout
}) {
    const grandTotal = bagTotal - productDiscount;

    return (
        <div className="price-detail-card">
            <h2>PRICE DETAILS</h2>
            <div className="price-summary">
                <p>Bag Total <span>₹{bagTotal}</span></p>
                <p className="discount-row">Product Discount <span>- ₹{productDiscount}</span></p>
                <p className="grand-total-row">Grand Total <span>₹{grandTotal}</span></p>
            </div>
            <div>
                <button onClick={onCheckout}>Checkout</button>
            </div>
        </div>
    );
}

export default PriceDetailCard;