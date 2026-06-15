// src/App.js
import './App.css';
import { useProducts } from './hooks/useProducts';
import ProductCard from './components/ProductCard';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  // ONE line of code replaces ALL your useState + useEffect code!
  const { data: products, isLoading, error } = useProducts();

  // Loading State - Required by your assignment
  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading amazing products...</p>
      </div>
    );
  }

  // Error State - Required by your assignment
  if (error) {
    return (
      <div className="error-state">
        <h2>⚠️ Oops! Something went wrong</h2>
        <p>We couldn't load the products. Please try again later.</p>
        <p className="error-details">Error: {error.message}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  // No Data State - Fallback screen
  if (!products || products.length === 0) {
    return (
      <div className="no-data-state">
        <p>No products found at the moment.</p>
      </div>
    );
  }

  // Success State - Map products to cards
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
      
      {/* Optional: React Query DevTools - shows cache, helps debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;