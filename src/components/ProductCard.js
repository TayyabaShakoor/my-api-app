// src/components/ProductCard.js
import './ProductCard.css';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';
import { useState } from 'react';

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    
    toast.success(`🛒 ${product.title.slice(0, 30)}... added to cart!`, {
      style: {
        background: '#48bb78',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '16px',
      },
      icon: '✅',
    });

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.title} 
        className="product-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150/667eea/ffffff?text=No+Image';
        }}
      />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-category">{product.category}</p>
        <button 
          onClick={handleAddToCart} 
          className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
        >
          {isAdded ? '✅ Added!' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;