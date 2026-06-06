import "./CategoryCard.css";

function CategoryCard({ image, title, id, className }) {
  return (
    <div className={`box ${className || ""}`} id={id}>
      <div className="img-wrapper">
        <img src={image} alt={`${title} Category`} className="category-img" />
      </div>
      <div className="box-content">
        <h2 className="category-title">{title}</h2>
        <div className="cta-link">
          <span className="cta-line"></span>
          <span className="cta-text">SHOP NOW</span>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
