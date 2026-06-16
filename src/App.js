// src/App.js
import './App.css';
import { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';
import CartPage from './components/CartPage';
import useCartStore from './store/cartStore';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const [showCart, setShowCart] = useState(false);
  const { data: products, isLoading, error } = useProducts();
  const totalItems = useCartStore((state) => state.totalItems);

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>🛍️ Loading amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>⚠️ Oops! Something went wrong</h2>
        <p>We couldn't load the products. Please try again later.</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header with Cart Button */}
      <header className="app-header">
        <div>
          <h1>🛍️ ShopVerse</h1>
          <p>Discover amazing products at great prices</p>
        </div>
        <div className="header-actions">
          <button 
            className="cart-button"
            onClick={() => setShowCart(!showCart)}
          >
            {showCart ? '📋 View Products' : '🛒 Cart'}
            {totalItems > 0 && !showCart && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </header>

      {/* Show Cart OR Products */}
      {showCart ? (
        <CartPage />
      ) : (
        <>
          {/* Add Product Form - Centered */}
          <div className="form-wrapper">
            <AddProductForm />
          </div>

          {/* Products Section */}
          <h2 className="section-title">✨ All Products</h2>
          {products?.length === 0 ? (
            <div className="no-data-state">
              <p>No products found. Add some!</p>
            </div>
          ) : (
            <div className="products-grid">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}

      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;