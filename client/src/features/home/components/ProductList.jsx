import { useState, useEffect } from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";
import { mockProducts } from "../../../data/mockProducts";
import CircularProgress from '@mui/material/CircularProgress';
import useProduct from "../../../hooks/useProduct";
import useGlobal from "../../../hooks/useGlobal.js";

function ProductList() {
  const {loading} = useGlobal();
  const { products, fetchProd } = useProduct();

  useEffect(() => {
    if (!products.length) {
      fetchProd();
    }
  }, []);



  return (
    <section className="product-list-section" id="product-section">
      {/* Header layout matching the blueprint: -------- New and popular --------- */}
      <div className="section-header">
        <span className="header-line line-left"></span>
        <h2 className="section-title">New and Popular</h2>
        <span className="header-line line-right"></span>
      </div>

      {/* Grid container with 4 cards per row */}
      {loading ? (
        <div className="loading">
          <CircularProgress size="4rem"  color="inherit" />
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
            key={product._id}
            id={product._id}
            image={product.featuredImage.url}
            name={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
          />
        ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
