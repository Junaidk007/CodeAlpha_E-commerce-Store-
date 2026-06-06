import "./catagores.css";
import CategoryCard from "./CategoryCard";

// Import category images
import poloImg from "../../../assets/category/polo.jpg";
import tshirtImg from "../../../assets/category/t-shirt.jpg";
import shirtImg from "../../../assets/category/shirt.jpg";

function Catagores() {
  return (
    <section className="category-section">
      <div className="cardbox">
        <CategoryCard
          image={poloImg}
          title="Polos"
          id="category-card-polo"
          className="box1"
        />
        <CategoryCard
          image={tshirtImg}
          title="T-shirts"
          id="category-card-tshirt"
          className="box2"
        />
        <CategoryCard
          image={shirtImg}
          title="Shirts"
          id="category-card-shirt"
          className="box3"
        />
      </div>
    </section>
  );
}

export default Catagores;
