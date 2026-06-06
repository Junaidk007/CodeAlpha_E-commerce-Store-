import React from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";

// Import product images
import oversizedt from "../../../assets/products/oversizedt.jpg";
import blazerImg from "../../../assets/products/blazer.png";
import knitwearImg from "../../../assets/products/knitwear.png";
import trousersImg from "../../../assets/products/trousers.png";
import topImg from '../../../assets/products/top.webp'
import checkshirt from '../../../assets/products/checkshirt.webp'
import poloT from '../../../assets/products/poloT.webp'
import oversizedTshirt from '../../../assets/products/oversized-tshirt.webp'

const productsList = [
  { id: 1, image: oversizedt, name: "Men's Black Oversized T-shirt", price: 56.00, oldPrice: 130.00 },
  { id: 2, image: blazerImg, name: "Minimalist Linen Blazer", price: 89.00, oldPrice: 160.00 },
  { id: 3, image: knitwearImg, name: "Oversized Knit Sweater", price: 74.00, oldPrice: 120.00 },
  { id: 4, image: trousersImg, name: "Tailored Pleated Trousers", price: 65.00, oldPrice: 110.00 },
  { id: 5, image: topImg, name: "Almost Friday Tee", price: 32.00, oldPrice: 56.00 },
  { id: 6, image: checkshirt, name: "Regular Fit Checks Shirt", price: 74.00, oldPrice: 120.00 },
  { id: 7, image: poloT, name: "Nordic Beige Polo T-Shirt", price: 32.00, oldPrice: 56.00 },
  { id: 8, image: oversizedTshirt, name: "Beige Graphic Printed Oversized T-shirt", price: 100.00, oldPrice: 220.00 },
];

function ProductList() {
  return (
    <section className="product-list-section" id="product-section">
      {/* Header layout matching the blueprint: -------- New and popular --------- */}
      <div className="section-header">
        <span className="header-line line-left"></span>
        <h2 className="section-title">New and Popular</h2>
        <span className="header-line line-right"></span>
      </div>

      {/* Grid container with 4 cards per row */}
      <div className="product-grid">
        {productsList.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            oldPrice={product.oldPrice}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
