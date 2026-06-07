import React from "react";
import "./QuantityAdjuster.css";

function QuantityAdjuster({ quantity = 1, onChange }) {
  const handleDecrease = () => {
    if (quantity > 1 && onChange) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (onChange) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="quantity-adjuster">
      <button 
        className="qty-btn" 
        onClick={handleDecrease}
        aria-label="Decrease Quantity"
      >
        <i className="fa-solid fa-minus"></i>
      </button>
      <span className="qty-number">{quantity}</span>
      <button 
        className="qty-btn" 
        onClick={handleIncrease}
        aria-label="Increase Quantity"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export default QuantityAdjuster;
