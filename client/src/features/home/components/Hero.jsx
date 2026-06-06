import React, { useState, useEffect } from "react";
import "./Hero.css";

// Import all 10 carousel images from the assets folder
import img1 from "../../../assets/hero_carousel/image1.webp";
import img2 from "../../../assets/hero_carousel/image2.jpg";
import img3 from "../../../assets/hero_carousel/image3.jpg";
import img4 from "../../../assets/hero_carousel/image4.webp";
import img5 from "../../../assets/hero_carousel/image5.webp";
import img6 from "../../../assets/hero_carousel/image6.jpg";
import img7 from "../../../assets/hero_carousel/image7.webp";
import img8 from "../../../assets/hero_carousel/image8.jpg";
import img9 from "../../../assets/hero_carousel/image9.jpg";
import img10 from "../../../assets/hero_carousel/image10.png";

// Carousel slides with corresponding descriptions and clothing tags
const carouselSlides = [
  { src: img1, alt: "Minimalist fashion style 1", shirt: "Cotton Shirt", polo: "Polo T-Shirt" },
  { src: img2, alt: "Minimalist fashion style 2", shirt: "Linen Shirt", polo: "Summer Polo" },
  { src: img3, alt: "Minimalist fashion style 3", shirt: "Classic Shirt", polo: "Casual Polo" },
  { src: img4, alt: "Minimalist fashion style 4", shirt: "Oversized Shirt", polo: "Knit Polo" },
  { src: img5, alt: "Minimalist fashion style 5", shirt: "Oxford Shirt", polo: "Pique Polo" },
  { src: img6, alt: "Minimalist fashion style 6", shirt: "Chambray Shirt", polo: "Ribbed Polo" },
  { src: img7, alt: "Minimalist fashion style 7", shirt: "Flannel Shirt", polo: "Soft Polo" },
  { src: img8, alt: "Minimalist fashion style 8", shirt: "Luxury Shirt", polo: "Premium Polo" },
  { src: img9, alt: "Minimalist fashion style 9", shirt: "Urban Shirt", polo: "Textured Polo" },
  { src: img10, alt: "Minimalist fashion style 10", shirt: "Modern Shirt", polo: "Signature Polo" },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set up the automatic image transition every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" id="hero-section">
      {/* Huge background text for layered depth effect */}
      <div className="hero-bg-text-container">
        <h1 className="hero-bg-text">MINIMAL</h1>
      </div>

      <div className="hero-container">
        {/* Left Column: Content */}
        <div className="hero-content">
          <span className="hero-tagline">
            <i className="fa-solid fa-chevron-right tagline-icon"></i>
            A simple guide to
          </span>
          <h2 className="hero-title" id="hero-heading">
            Minimalist <br />
            <span>style</span>
          </h2>
          <p className="hero-description" id="hero-desc">
            Discover the beauty of simplicity. Our curated collection brings together clean lines, structured silhouettes, and premium fabrics. Perfect for your modern, everyday wardrobe.
          </p>
          <div className="hero-cta-group">
            <a href="#product-section">
              <button className="hero-cta-btn" id="hero-cta-shop-now">
                <span>shop now</span>
                <i className="fa-solid fa-arrow-right cta-icon"></i>
              </button>
            </a>
          </div>
        </div>

        {/* Right Column: Model Carousel */}
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            {carouselSlides.map((slide, index) => (
              <img
                key={index}
                src={slide.src}
                alt={slide.alt}
                className={`hero-img ${index === currentIndex ? "active" : ""}`}
                id={`hero-model-image-${index}`}
              />
            ))}

            {/* Interactive floating badges tied to the active slide's items */}
            <div className="hero-badge badge-left" id="badge-shirt">
              <span className="badge-dot"></span>
              <span className="badge-text">{carouselSlides[currentIndex].shirt}</span>
            </div>
            <div className="hero-badge badge-right" id="badge-polo">
              <span className="badge-dot"></span>
              <span className="badge-text">{carouselSlides[currentIndex].polo}</span>
            </div>

            {/* Carousel navigation indicators */}
            <div className="carousel-indicators" id="carousel-indicators">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator-dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  id={`indicator-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with micro-animation */}
      <div className="hero-scroll-indicator" id="hero-scroll">
        <span className="scroll-line"></span>
        <span className="scroll-text">Scroll Down</span>
      </div>
    </section>
  );
}

export default Hero;
