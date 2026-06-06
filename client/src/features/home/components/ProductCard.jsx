import React from "react";
import "./ProductCard.css";

function ProductCard({ image, name, price, oldPrice }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt={name} className="product-card-img" />
        {/* Quick add shopping bag button overlay for rich experience */}
        <button className="product-quick-add-btn" aria-label="Quick Add to Bag">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-price-container">
          <span className="product-price">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="product-old-price">${oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;