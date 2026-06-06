import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section" id="footer-section">
      <div className="footer-container">
        {/* Column 1: Brand Intro & Socials */}
        <div className="footer-column brand-info">
          <a href="/" className="footer-logo">
            arbuzz
          </a>
          <p className="footer-about">
            Crafting modern, minimalist essentials for the everyday wardrobe. 
            Designed with simplicity, premium fabrics, and longevity in mind.
          </p>
          <div className="social-links">
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-pinterest"></i>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>

        {/* Column 2: Shop links */}
        <div className="footer-column">
          <h4 className="footer-title">Shop</h4>
          <ul className="footer-links">
            <li><a href="#men">Men's Collection</a></li>
            <li><a href="#women">Women's Collection</a></li>
            <li><a href="#accessories">Accessories</a></li>
            <li><a href="#new-arrivals">New Arrivals</a></li>
            <li><a href="#sale">Sale & Offers</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div className="footer-column">
          <h4 className="footer-title">Help</h4>
          <ul className="footer-links">
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#shipping">Shipping & Delivery</a></li>
            <li><a href="#returns">Returns & Exchanges</a></li>
            <li><a href="#size-guide">Size Guide</a></li>
            <li><a href="#faq">FAQs</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-column newsletter">
          <h4 className="footer-title">Newsletter</h4>
          <p className="newsletter-text">
            Subscribe to receive early access to new collections, styling guides, and exclusive offers.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-submit" aria-label="Subscribe">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} arbuzz. All rights reserved.
          </p>
          <div className="payment-icons">
            <i className="fa-brands fa-cc-visa" title="Visa"></i>
            <i className="fa-brands fa-cc-mastercard" title="Mastercard"></i>
            <i className="fa-brands fa-cc-paypal" title="PayPal"></i>
            <i className="fa-brands fa-cc-apple-pay" title="Apple Pay"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
