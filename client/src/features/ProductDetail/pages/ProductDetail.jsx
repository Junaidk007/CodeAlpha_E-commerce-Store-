import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import ProductImageSection from "../components/ProductImageSection.jsx";
import QuantityAdjuster from "../components/QuantityAdjuster.jsx";
import Toast from "../../../components/Toast.jsx";

// Import product images
import oversizedt from "../../../assets/products/oversizedt.jpg";
import blazerImg from "../../../assets/products/blazer.png";
import knitwearImg from "../../../assets/products/knitwear.png";
import trousersImg from "../../../assets/products/trousers.png";
import topImg from "../../../assets/products/top.webp";
import checkshirt from "../../../assets/products/checkshirt.webp";
import poloT from "../../../assets/products/poloT.webp";
import oversizedTshirt from "../../../assets/products/oversized-tshirt.webp";

const productsData = [
    {
        id: 1,
        name: "Men's Black Oversized T-shirt",
        price: 56.00,
        oldPrice: 130.00,
        images: [oversizedt, oversizedTshirt, topImg, checkshirt],
        colors: [
            { name: "Ink Black", hex: "#111111" },
            { name: "Nordic Beige", hex: "#dcd2c4" },
            { name: "White Cream", hex: "#f9f6f0" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        description: "Designed for everyday ease and style, this black oversized tee is crafted from heavyweight cotton jersey. It features dropped shoulders and a boxy silhouette for a modern, relaxed aesthetic.",
        details: [
            "100% Premium Organic Cotton",
            "Heavyweight fabric (240 GSM)",
            "Ribbed crewneck collar",
            "Pre-shrunk to retain shape and fit",
            "Made ethically and sustainably"
        ]
    },
    {
        id: 2,
        name: "Minimalist Linen Blazer",
        price: 89.00,
        oldPrice: 160.00,
        images: [blazerImg, knitwearImg, trousersImg, topImg],
        colors: [
            { name: "Desert Sand", hex: "#e2dacb" },
            { name: "Sage Green", hex: "#8a9a86" },
            { name: "Navy Blue", hex: "#1d2a44" }
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Elevate your warm-weather wardrobe with this minimalist blazer. Crafted from a premium breathable linen blend, it offers a relaxed structured drape, clean lines, and lightweight comfort.",
        details: [
            "Linen-viscose blend for optimal drape",
            "Unlined back for extra breathability",
            "Two front patch pockets and inner pocket",
            "Single-button closure",
            "Dry clean recommended"
        ]
    },
    {
        id: 3,
        name: "Oversized Knit Sweater",
        price: 74.00,
        oldPrice: 120.00,
        images: [knitwearImg, blazerImg, trousersImg, checkshirt],
        colors: [
            { name: "Oatmeal Cream", hex: "#eae4d8" },
            { name: "Charcoal Grey", hex: "#3b3b3c" },
            { name: "Rust Brown", hex: "#9e5c41" }
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Stay warm in style with this cozy oversized knit sweater. Featuring a ribbed crewneck, cuffs, and hem, this sweater is knitted from a premium wool blend with a textured finish.",
        details: [
            "Premium wool-acrylic blend",
            "Thick, textured knit pattern",
            "Oversized slouchy fit",
            "Ribbed collar, cuffs, and hem",
            "Hand wash cold, dry flat"
        ]
    },
    {
        id: 4,
        name: "Tailored Pleated Trousers",
        price: 65.00,
        oldPrice: 110.00,
        images: [trousersImg, blazerImg, knitwearImg, topImg],
        colors: [
            { name: "Steel Grey", hex: "#7a7d80" },
            { name: "Olive Green", hex: "#556b2f" },
            { name: "Pitch Black", hex: "#111111" }
        ],
        sizes: ["28", "30", "32", "34", "36"],
        description: "Perfectly combining comfort and formal structure, these tailored pleated trousers feature a wide-leg cut, double front pleats, and a comfortable semi-elasticated waistband.",
        details: [
            "Breathable poly-wool blend fabric",
            "Double front pleats for classic drape",
            "Adjustable button tab waistband",
            "Side slip pockets and buttoned rear welt pockets",
            "Machine washable, easy iron finish"
        ]
    },
    {
        id: 5,
        name: "Almost Friday Tee",
        price: 32.00,
        oldPrice: 56.00,
        images: ['https://cdn.shopify.com/s/files/1/1368/3463/files/BLACK_SS_ALMOST-FRIDAY-TEE-4.jpg?v=1719524881&width=1200&height=1600&crop=center', 'https://cdn.shopify.com/s/files/1/1368/3463/files/BLACK_SS_ALMOST-FRIDAY-TEE-7.jpg?v=1739917560&width=1200&height=1600&crop=center', 'https://cdn.shopify.com/s/files/1/1368/3463/files/BLACK_SS_ALMOST-FRIDAY-TEE-3CROPPED.jpg?v=1739920196&width=1200&height=1600&crop=center', 'https://cdn.shopify.com/s/files/1/1368/3463/products/BLACK-ALMOST-FRIDAY-TEE-CROPPED_860566f2-0b46-401f-901a-c345bc807c35.jpg?v=1739920196&width=1200&height=1600&crop=center'],
        colors: [
            { name: "Faded Black", hex:  "#2e2e2e"},
            { name: "Optic White", hex: "#ffffff" }
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Start the weekend mood early with this casual graphic tee. Cut from ultra-soft combed cotton, it features a custom minimalist graphic print on the chest.",
        details: [
            "100% Combed ringspun cotton",
            "Midweight soft-touch jersey",
            "High-density durable graphic print",
            "Reinforced shoulder stitching",
            "Machine wash warm with like colors"
        ]
    },
    {
        id: 6,
        name: "Regular Fit Checks Shirt",
        price: 74.00,
        oldPrice: 120.00,
        images: [checkshirt, poloT, topImg, oversizedt],
        colors: [
            { name: "Forest Plaid", hex: "#2d4436" },
            { name: "Autumn Amber", hex: "#b87333" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "A versatile wardrobe staple, this regular fit checkered shirt is crafted from soft brushed cotton flannel, offering warmth and comfort for casual styling.",
        details: [
            "100% Brushed cotton flannel",
            "Button-down collar",
            "Single chest patch pocket",
            "Two-button adjustable cuffs",
            "Warm iron, machine wash cold"
        ]
    },
    {
        id: 7,
        name: "Nordic Beige Polo T-Shirt",
        price: 32.00,
        oldPrice: 56.00,
        images: [poloT, topImg, checkshirt, oversizedTshirt],
        colors: [
            { name: "Nordic Beige", hex: "#dcd2c4" },
            { name: "Navy Blue", hex: "#1d2a44" },
            { name: "Dark Maroon", hex: "#5a1827" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        description: "A refined take on the classic polo. Featuring a modern zipper placket, fine contrast collar tipping, and knit cuffs, this polo is made from breathable cotton piqué.",
        details: [
            "Breathable cotton piqué knit",
            "Contrast collar tipping design",
            "Premium zipper placket closure",
            "Tailored fit with ribbed sleeve bands",
            "Machine wash cold, dry in shade"
        ]
    },
    {
        id: 8,
        name: "Beige Graphic Printed Oversized T-shirt",
        price: 100.00,
        oldPrice: 220.00,
        images: [oversizedTshirt, oversizedt, topImg, checkshirt],
        colors: [
            { name: "Nordic Beige", hex: "#dcd2c4" },
            { name: "White Cream", hex: "#f9f6f0" }
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Elevate your street style with this high-density graphic print oversized tee. Cut in a boxy fit from heavy premium cotton, this shirt is detailed with a subtle drop-shoulder seam.",
        details: [
            "100% Heavyweight organic cotton",
            "250 GSM premium knit jersey",
            "Durable screen print detail on chest & back",
            "Ribbed mock-neck collar",
            "Wash inside out, do not iron on print"
        ]
    }
];

function ProductDetail() {
    const { id } = useParams();

    // Find current product or default to the first one
    const product = productsData.find(p => p.id === parseInt(id)) || productsData[0];

    // Interactivity states
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [cartMessage, setCartMessage] = useState("");

    // Sync state with product shifts (if user clicks on different products)
    useEffect(() => {
        setSelectedColor(product.colors[0]);
        setSelectedSize(product.sizes[1] || product.sizes[0]);
        setQuantity(1);
        setCartMessage("");
    }, [product]);

    const handleAddToCart = () => {
        setCartMessage(`Successfully added ${quantity} item(s) to cart!`);
        setTimeout(() => setCartMessage(""), 3500);
    };

    return (
        <div className="product-detail-container">
            <Toast message={cartMessage} />

            <div className="product-detail-grid">
                <ProductImageSection images={product.images} productName={product.name} />
                <div className="product-description-section">
                    <h1 className="product-title">{product.name}</h1>
                    <div className="price-container">
                        <span className="product-price">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="colors">
                        <p className="option-label">Color: <span className="selected-value">{selectedColor.name}</span></p>
                        <div className="color-options-list">
                            {product.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`color-circle-wrapper ${selectedColor.name === color.name ? "active" : ""}`}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    <div
                                        className="color-circle"
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sizes">
                        <div className="sizes-header">
                            <p className="option-label">Size: <span className="selected-value">{selectedSize}</span></p>
                            <button className="size-chart-trigger">Size Chart</button>
                        </div>
                        <div className="size-options-list">
                            {product.sizes.map((size, index) => (
                                <button
                                    key={index}
                                    className={`size-box ${selectedSize === size ? "active" : ""}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="btn">
                        <QuantityAdjuster quantity={quantity} onChange={setQuantity} />

                        <button className="add-to-cart-button" onClick={handleAddToCart}>
                            ADD TO BAG
                        </button>
                    </div>

                    <div className="product-description">
                        <h3 className="description-title">Product details</h3>
                        <p className="description-text">{product.description}</p>

                        <ul className="details-list">
                            {product.details.map((detail, index) => (
                                <li key={index} className="details-list-item">
                                    <span className="bullet-point">•</span> {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;