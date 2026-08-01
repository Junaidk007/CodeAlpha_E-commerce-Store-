import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import ProductImageSection from "../components/ProductImageSection.jsx";
import QuantityAdjuster from "../components/QuantityAdjuster.jsx";
import Toast from "../../../components/Toast.jsx";
import { getProductById, addToCart } from "../../../services/apiCalls";
import { useCart, useAuth } from "../../../hooks";


function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToCart: contextAddToCart } = useCart();
    const { token } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Interactivity states
    const [activeImg, setActiveImg] = useState("");
    const [selectedColor, setSelectedColor] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(0);
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getProductById(id);
                if (response && response.data) {
                    setProduct(response.data);
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError(err.message || "Failed to fetch product details");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Sync state with product shifts (if user clicks on different products)
    useEffect(() => {
        if (product && product.variants && product.variants.length > 0) {
            const defaultVariant = product.variants[0];
            setSelectedColor(defaultVariant.color);
            if (defaultVariant.sizes && defaultVariant.sizes.length > 0) {
                // Default to first available size or the first size in list
                const defaultSize = defaultVariant.sizes.find(s => s.stock > 0) || defaultVariant.sizes[0];
                setSelectedSize(defaultSize);
                setStock(defaultSize.stock || 0);
            } else {
                setSelectedSize({});
                setStock(0);
            }
            setQuantity(1);
            setCartMessage("");
        }
    }, [product]);

    const handleColorChange = (color) => {
        setSelectedColor(color);
        const targetVariant = product?.variants?.find(v => v.color.name === color.name);
        if (targetVariant) {
            const defaultSize = targetVariant.sizes.find(s => s.stock > 0) || targetVariant.sizes[0] || {};
            setSelectedSize(defaultSize);
            setStock(defaultSize.stock || 0);
            setQuantity(1);
        }
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        setStock(size.stock || 0);
        setQuantity(1);
    };

    const handleQuantityChange = (newQty) => {
        if (newQty > 0 && newQty <= stock) {
            setQuantity(newQty);
        }
    };

   const handleAddToCart = async () => {
    if (stock === 0) {
        setCartMessage("This item is currently out of stock.");
        setTimeout(() => setCartMessage(""), 3500);
        return;
    }

    if (!token) {
        setCartMessage("Please login to add items to cart");
        setTimeout(() => setCartMessage(""), 3500);
        navigate("/account/auth");
        return;
    }

    const data = {
        _id: product._id,
        product: product._id,
        title: product.title,
        price: product.price,
        quantity,
        size: selectedSize.size,
        color: selectedColor,
        image: variantImages[0],
    };

    try {
        const response = await addToCart(data, token);
        contextAddToCart(data);

        setCartMessage(response?.message || "Added to cart successfully!");
        setTimeout(() => setCartMessage(""), 3500);

    } catch (e) {
        // Still save locally in context as fallback
        contextAddToCart(data);
        setCartMessage(e.message || "Item added to local cart");
        setTimeout(() => setCartMessage(""), 3500);
    }
};


    if (loading) {
        return (
            <div className="product-detail-loading">
                <div className="spinner"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-error">
                <h2>Oops!</h2>
                <p>{error || "Product not found"}</p>
            </div>
        );
    }

    const currentVariant = product.variants.find(v => v.color.name === selectedColor.name) || product.variants[0];
    const variantImages = currentVariant?.images || [];

    return (
        <div className="product-detail-container">
            <Toast message={cartMessage} />

            <div className="product-detail-grid">
                <ProductImageSection images={variantImages} activeImg={activeImg} setActiveImg={setActiveImg} />
                <div className="product-description-section">
                    <h1 className="product-title">{product.title}</h1>
                    <div className="price-container">
                        <span className="product-price">${product.price}</span>
                    </div>

                    <div className="colors">
                        <p className="option-label">Color: <span className="selected-value">{selectedColor.name || ""}</span></p>
                        <div className="color-options-list">
                            {product.variants.map((variant, index) => (
                                <div
                                    key={index}
                                    className={`color-circle-wrapper ${selectedColor.name === variant.color.name ? "active" : ""}`}
                                    onClick={() => handleColorChange(variant.color)}
                                >
                                    <div
                                        className="color-circle"
                                        style={{ backgroundColor: variant.color.hex }}
                                        title={variant.color.name}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sizes">
                        <div className="sizes-header">
                            <p className="option-label">Size: <span className="selected-value">{selectedSize.size || ""}</span></p>
                            <button className="size-chart-trigger">Size Chart</button>
                        </div>
                        <div className="size-options-list">
                            {currentVariant?.sizes?.map((size, index) => (
                                <button
                                    key={index}
                                    className={`size-box ${selectedSize.size === size.size ? "active" : ""} ${size.stock === 0 ? "out-of-stock" : ""}`}
                                    onClick={() => handleSizeChange(size)}
                                    disabled={size.stock === 0}
                                >
                                    {size.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="stock-status">
                        {stock === 0 ? (
                            <span className="badge out-of-stock-badge">Out of Stock</span>
                        ) : stock <= 5 ? (
                            <span className="badge low-stock-badge">Only {stock} left in stock!</span>
                        ) : (
                            <span className="badge in-stock-badge">In Stock ({stock} available)</span>
                        )}
                    </div>

                    <div className="btn">
                        <QuantityAdjuster quantity={quantity} onChange={handleQuantityChange} />

                        <button
                            className="add-to-cart-button"
                            onClick={handleAddToCart}
                            disabled={stock === 0}
                        >
                            {stock === 0 ? "OUT OF STOCK" : "ADD TO BAG"}
                        </button>
                    </div>

                    <div className="product-description">
                        <h3 className="description-title">Product details</h3>
                        <p className="description-text">{product.description}</p>

                        {product.highlights && product.highlights.length > 0 && (
                            <ul className="details-list">
                                {product.highlights.map((highlight, index) => (
                                    <li key={index} className="details-list-item">
                                        <span className="bullet-point">•</span> {highlight}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;