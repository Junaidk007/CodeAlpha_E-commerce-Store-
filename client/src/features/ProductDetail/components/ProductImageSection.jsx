import { useState, useEffect } from "react";
import "./ProductImageSection.css";

function ProductImageSection({ images = [] , activeImg, setActiveImg }) {

  // Sync state if the product's images list changes (navigation)
  useEffect(() => {
    if (images.length > 0) {
      setActiveImg(images[0].url);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="image-section-placeholder">No images available</div>;
  }

  const handlePrevImage = () => {
    const currentIndex = images.findIndex(img => img.url === activeImg);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setActiveImg(images[prevIndex].url);
  };

  const handleNextImage = () => {
    const currentIndex = images.findIndex(img => img.url === activeImg);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % images.length;
    setActiveImg(images[nextIndex].url);
  };

  return (
    <div className="image-section">
      <div className="vertical-image-box">
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`thumbnail-wrapper ${activeImg === img.url ? "active" : ""}`}
            onClick={() => setActiveImg(img.url)}
          >
            <img src={img.url} alt={img.filename || `View ${index + 1}`} className="thumbnail-img" />
          </div>
        ))}
      </div>

      <div className="image-box carousel">
        <img src={activeImg} className="main-product-img" alt="Active Product" />

        {/* Carousel navigation arrows */}
        <button className="carousel-arrow prev-arrow" onClick={handlePrevImage} aria-label="Previous image">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="carousel-arrow next-arrow" onClick={handleNextImage} aria-label="Next image">
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Pagination dots */}
        <div className="carousel-dots">
          {images.map((img, index) => (
            <span 
              key={index} 
              className={`dot ${activeImg === img.url ? "active" : ""}`}
              onClick={() => setActiveImg(img.url)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductImageSection;
