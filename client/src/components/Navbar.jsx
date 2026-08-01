import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart, useAuth } from "../hooks";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "MEN", url: "#men" },
    { name: "WOMEN", url: "#women", active: true }, // active highlight matching the reference image
    { name: "ABOUT", url: "#about" },
    { name: "CONTACT", url: "#contact" },
  ];

  return (
    <>
      <nav className="navbar" id="main-navbar">
        <div className="navbar-container">
          {/* Left Side: Hamburger Icon + Logo */}
          <div className="navbar-left">
            <button 
              className="navbar-toggle-btn" 
              onClick={toggleMenu} 
              aria-label="Toggle Navigation Menu"
              id="navbar-toggle-trigger"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <a href="/" className="navbar-logo" id="navbar-logo">
              arbuzz
            </a>
          </div>

          {/* Middle: Navigation Links (Desktop only) */}
          <ul className="navbar-menu">
            {navLinks.map((link, index) => (
              <li key={index} className="navbar-item">
                <a 
                  href={link.url} 
                  className={`navbar-link ${link.active ? "active" : ""}`}
                  id={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Side: Search, Profile, Shopping Bag */}
          <div className="navbar-right">
            <Link to="/account/auth" className="navbar-icon-btn" aria-label="Profile" id="nav-btn-profile">
              <i className="fa-regular fa-user"></i>
            </Link>
            <button className="navbar-icon-btn navbar-cart-btn" aria-label="Cart" id="nav-btn-cart">
              <Link to="/checkout/cart">
                <i className="fa-solid fa-bag-shopping"></i>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile/Toggle Overlay Menu */}
      <div className={`fullscreen-overlay ${isMenuOpen ? "open" : ""}`} id="fullscreen-overlay-menu">
        {/* Close Button on Top Right Corner */}
        <button 
          className="overlay-close-btn" 
          onClick={toggleMenu} 
          aria-label="Close Menu"
          id="navbar-close-trigger"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="overlay-content">
          <ul className="overlay-menu">
            {navLinks.map((link, index) => (
              <li 
                key={index} 
                className="overlay-item" 
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <a 
                  href={link.url} 
                  className={`overlay-link ${link.active ? "active" : ""}`}
                  onClick={toggleMenu}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
