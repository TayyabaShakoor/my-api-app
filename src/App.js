// src/App.js
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useProducts } from './hooks/useProducts';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';
import CartPage from './components/CartPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AuthGuard from './components/AuthGuard';
import useCartStore from './store/cartStore';
import toast from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';

// Navigation Component
function Navigation() {
  // ✅ FIX: Add 'user' to the destructuring
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

// Home Page Component
function HomePage() {
  const { data: products, isLoading, error } = useProducts();

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
      <div className="form-wrapper">
        <AddProductForm />
      </div>

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
  );
}

// Main App Component
function App() {
  // Check authentication status on app load
  const checkAuth = useCartStore((state) => state.checkAuth);
  checkAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
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
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </BrowserRouter>
  );
}

export default App;