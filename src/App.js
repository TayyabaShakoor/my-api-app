// src/App.js
import './App.css';
import { useState, useEffect } from 'react';
import { fetchProducts } from './services/api';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const productList = await fetchProducts();
        setProducts(productList);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  // Loading State
  if (isLoading) {
    return <div className="loading-state">Loading amazing products...</div>;
  }

  // Error State
  if (error) {
    return (
      <div className="error-state">
        <h2>Oops! Something went wrong.</h2>
        <p>We couldn't load the products. Please try again later.</p>
        <p>Error: {error}</p>
      </div>
    );
  }

  // No Data State
  if (products.length === 0) {
    return <div className="no-data-state">No products found at the moment.</div>;
  }

  // Success State - Map products to Product Cards
  return (
    <div className="App">
      <header className="app-header">
        <h1>Our Product Catalog</h1>
        <p>Here's what we have in stock ({products.length} products)</p>
      </header>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;