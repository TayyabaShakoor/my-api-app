// src/components/ProductCard.js
import React, { memo, useCallback, useState } from 'react';
import './ProductCard.css';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';

const ProductCard = memo(({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = useCallback(() => {
    addToCart(product);
    toast.success(`🛒 ${product.title.slice(0, 30)}... added!`, {
      style: {
        background: '#48bb78',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '12px',
        fontSize: '14px',
      },
      icon: '✅',
    });
  }, [addToCart, product]);

  if (!product) return null;

  <img 
  src={product.image} 
  alt={product.title} 
  className="product-image"
  loading="lazy"
  decoding="async"
  width="150"
  height="150"
  srcSet={`
    ${product.image}?w=150 150w,
    ${product.image}?w=300 300w
  `}
  sizes="(max-width: 768px) 150px, 300px"
  onLoad={() => setImageLoaded(true)}
  onError={() => {
    setImageError(true);
    setImageLoaded(true);
  }}
/>

  // ✅ Use WebP format with fallback
  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/150/667eea/ffffff?text=No+Image';
    // Some APIs support WebP conversion via query param
    return url;
  };

  return (
    <div className="product-card">
      <div className="image-wrapper">
        {!imageLoaded && !imageError && <div className="image-placeholder">📷</div>}
        {imageError && <div className="image-placeholder">🖼️</div>}
        <img 
          src={getImageUrl(product.image)}
          alt={product.title} 
          className="product-image"
          loading="lazy"
          decoding="async"
          width="150"
          height="150"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          style={{ 
            display: imageLoaded && !imageError ? 'block' : 'none' 
          }}
        />
      </div>
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-category">{product.category}</p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;