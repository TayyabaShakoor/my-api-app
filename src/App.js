// src/App.js
import React, { useMemo, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useProducts } from './hooks/useProducts';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';
import AuthGuard from './components/AuthGuard';
import LoadingSpinner from './components/LoadingSpinner';
import useCartStore from './store/cartStore';
import { useDebounce } from './hooks/useDebounce';
import NotFoundPage from './pages/NotFoundPage';
import toast from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';

// ✅ Lazy load heavy components (imports at the top)
const CartPage = lazy(() => import('./components/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

// ============================================================
// NAVIGATION COMPONENT
// ============================================================
function Navigation() {
  const { isAuthenticated, user, logout, totalItems } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('👋 Logged out successfully!', {
      style: {
        background: '#e53e3e',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '16px',
      },
    });
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🛍️ ShopVerse</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart
          {totalItems > 0 && <span className="nav-badge">{totalItems}</span>}
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">📊 Dashboard</Link>
            <div className="user-email">
              <span className="email-icon">👤</span>
              <span className="email-text" title={user?.email || ''}>
                {user?.email || 'User'}
              </span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">🔐 Login</Link>
        )}
      </div>
    </nav>
  );
}

// ============================================================
// HOME PAGE COMPONENT
// ============================================================
function HomePage() {
  const { data: products, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!debouncedSearchTerm.trim()) return products;
    const searchLower = debouncedSearchTerm.toLowerCase().trim();
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower)
    );
  }, [products, debouncedSearchTerm]);

  const productList = useMemo(() => {
    if (!filteredProducts || filteredProducts.length === 0) return null;
    return filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  }, [filteredProducts]);

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
    <>
      <div className="search-wrapper">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search products by name, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>
        <p className="search-results">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="form-wrapper">
        <AddProductForm />
      </div>

      <h2 className="section-title">✨ All Products</h2>
      {filteredProducts.length === 0 ? (
        <div className="no-data-state">
          <p>🔍 No products found matching "{searchTerm}"</p>
          <button className="retry-btn" onClick={() => setSearchTerm('')}>
            Clear Search
          </button>
        </div>
      ) : (
        <div className="products-grid">{productList}</div>
      )}
    </>
  );
}

// ============================================================
// LOADING FALLBACK
// ============================================================
const LoadingFallback = () => <LoadingSpinner message="Loading page..." />;

// ============================================================
// MAIN APP COMPONENT
// ============================================================
function App() {
  const checkAuth = useCartStore((state) => state.checkAuth);
  checkAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <AuthGuard>
                <DashboardPage />
              </AuthGuard>
            } />
            <Route path="/cart" element={
              <AuthGuard>
                <CartPage />
              </AuthGuard>
            } />
             <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </div>
    </BrowserRouter>
  );
}

export default App;