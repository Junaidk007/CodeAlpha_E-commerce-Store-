import { useState, useEffect } from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../../services/apiCalls";

function ProductList() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      }
      catch (error){ 
        console.log(error);
      }
    };
    fetchProducts();
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
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.featuredImage.url}
            name={product.title}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
