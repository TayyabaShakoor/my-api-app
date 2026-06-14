// src/components/ProductCard.js
import './ProductCard.css';

function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-category">{product.category}</p>
      </div>
    </div>
  );
}

export default ProductCard;