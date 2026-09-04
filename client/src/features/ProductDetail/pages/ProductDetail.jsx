import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import ProductImageSection from "../components/ProductImageSection.jsx";
import QuantityAdjuster from "../components/QuantityAdjuster.jsx";
import Toast from "../../../components/Toast.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import useProduct from "../../../hooks/useProduct.js";
import useGlobal from "../../../hooks/useGlobal.js";
import useCart from "../../../hooks/useCart.js";
// NOTE: mockProducts import hata diya — kahin use nahi ho raha tha (dead import)

const TOAST_DURATION = 3500; // magic number ko ek jagah define kar diya

function ProductDetail() {
    const { id } = useParams();
    const { product, fetchProductById } = useProduct();
    const { loading } = useGlobal();
    const {addCart} = useCart();


    // ============ ALL HOOKS GO HERE — TOP LEVEL, NO CONDITIONS ============
    // React ka strict rule: hooks kabhi bhi if/return/loop ke andar ya
    // unke baad call nahi hone chahiye. Har render mein hooks ki
    // count aur order EXACTLY same honi chahiye — isiliye sab hooks
    // (useState, useEffect, useMemo, useRef) yahan upar, kisi bhi
    // early return se pehle likhe gaye hain.

    // Interactivity states
    const [activeImg, setActiveImg] = useState("");
    const [selectedColor, setSelectedColor] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [quantity, setQuantity] = useState(1);
    // NOTE: `stock` ko alag state se hata diya — yeh selectedSize.stock ka
    // hi duplicate tha, aur har jagah manually sync karna padta tha
    // (bug-prone). Neeche derive kar rahe hain seedha selectedSize se.

    useEffect(() => {
        if (!product || product?._id !== id) {
            fetchProductById(id);
        }
        // fetchProductById ab useCallback se stable hai (Provider mein),
        // isliye isse deps array mein daalna safe hai — infinite loop nahi banega.
    }, [id, fetchProductById]);

    // Product load hone par default color/size/image set karna
    useEffect(() => {
        if (product?.variants?.length > 0) {
            const defaultVariant = product.variants[0];
            setSelectedColor(defaultVariant.color);

            if (defaultVariant.sizes?.length > 0) {
                const defaultSize =
                    defaultVariant.sizes.find(s => s.stock > 0) || defaultVariant.sizes[0];
                setSelectedSize(defaultSize);
            } else {
                setSelectedSize({});
            }

            if (defaultVariant.images?.length > 0) {
                setActiveImg(defaultVariant.images[0].url);
            }

            setQuantity(1);
        }
    }, [product]);


    // useMemo: yeh calculation product.variants.find() chalata hai —
    // agar isse memoize na karein, to yeh HAR render pe dobara chalega.
    // useMemo isse skip karta hai jab tak deps (product, selectedColor)
    // actually na badlein.
    // IMPORTANT: yeh early returns (loading/!product checks) se PEHLE hai,
    // isliye `product` yahan abhi null bhi ho sakta hai — isliye `?.`
    // (optional chaining) zaroori hai taaki crash na ho.
    const currentVariant = useMemo(
        () => product?.variants?.find(v => v.color?.name === selectedColor?.name) || product?.variants?.[0],
        [product, selectedColor]
    );

    // ============ HOOKS KHATAM — ab yahan se normal logic/handlers ============

    const handleColorChange = (color) => {
        setSelectedColor(color);
        const targetVariant = product?.variants?.find(v => v.color.name === color.name);
        if (targetVariant) {
            const defaultSize =
                targetVariant.sizes.find(s => s.stock > 0) || targetVariant.sizes[0] || {};
            setSelectedSize(defaultSize);
            if (targetVariant.images?.length > 0) {
                setActiveImg(targetVariant.images[0].url);
            }
            setQuantity(1);
        }
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        setQuantity(1);
    };

    // stock ab derived hai — koi separate state nahi, koi sync bug nahi
    const stock = selectedSize?.stock || 0;

    const handleQuantityChange = (newQty) => {
        if (newQty > 0 && newQty <= stock) {
            setQuantity(newQty);
        }
    };

    const handleAddToCart = async () => {
        if (stock === 0) return;

        // Build the payload as a LOCAL variable — NOT as state.
        // Reason: setState is async (updates on next render), so if we did
        // setCartData({...}) and then addCart(cartData), cartData would
        // still be the OLD empty {} value. Local variable = immediate.
        const payload = {
            product: id,
            quantity: quantity,
            size: selectedSize.size,
            color: selectedColor,          // { name, hex }
            image: currentVariant?.images?.[0],
            stock: selectedSize.stock,
        };

        await addCart(payload);
    };

    // ============ EARLY RETURNS — ab yahan aate hain, sab hooks ke baad ============

    if (loading) {
        return (
            <div className="product-detail-loading">
                <div className="loading">
                    <CircularProgress size="4rem" color="inherit" />
                </div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-error">
                <h2>Oops!</h2>
                <p>Product not found</p>
            </div>
        );
    }

    // yahan se product guaranteed non-null hai
    const variantImages = currentVariant?.images || (product.featuredImage ? [product.featuredImage] : []);

    return (
        <div className="product-detail-container">

            <div className="product-detail-grid">
                <ProductImageSection images={variantImages} activeImg={activeImg} setActiveImg={setActiveImg} />
                <div className="product-description-section">
                    <h1 className="product-title">{product.title}</h1>
                    <div className="price-container">
                        <span className="product-price">₹{product.price}</span>
                        {product.oldPrice && (
                            // NOTE: inline style ko CSS class mein move kar diya
                            // (.product-old-price) — neeche CSS snippet mein diya hai
                            <span className="product-old-price">
                                ₹{product.oldPrice}
                            </span>
                        )}
                    </div>

                    <div className="colors">
                        <p className="option-label">Color: <span className="selected-value">{selectedColor?.name || ""}</span></p>
                        <div className="color-options-list">
                            {product.variants?.map((variant, index) => (
                                // div ki jagah button use kiya — keyboard/accessibility
                                // ke liye better hai (size options mein already button tha)
                                <button
                                    key={index}
                                    type="button"
                                    aria-label={variant.color?.name}
                                    className={`color-circle-wrapper ${selectedColor?.name === variant.color?.name ? "active" : ""}`}
                                    onClick={() => handleColorChange(variant.color)}
                                >
                                    <span
                                        className="color-circle"
                                        style={{ backgroundColor: variant.color?.hex }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sizes">
                        <div className="sizes-header">
                            <p className="option-label">Size: <span className="selected-value">{selectedSize?.size || ""}</span></p>
                            <button className="size-chart-trigger">Size Chart</button>
                        </div>
                        <div className="size-options-list">
                            {currentVariant?.sizes?.map((size, index) => (
                                <button
                                    key={index}
                                    className={`size-box ${selectedSize?.size === size.size ? "active" : ""} ${size.stock === 0 ? "out-of-stock" : ""}`}
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
                        <QuantityAdjuster quantity={quantity} stock={stock} onChange={handleQuantityChange} />
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

                        {product.highlights?.length > 0 && (
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