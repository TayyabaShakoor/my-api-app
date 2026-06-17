// src/pages/DashboardPage.js
import useCartStore from '../store/cartStore';
import { useNavigate } from 'react-router-dom'; // ← Add this
import './DashboardPage.css';

function DashboardPage() {
  const { user, totalItems, totalPrice, cart } = useCartStore();
  const navigate = useNavigate(); // ← Add this

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>👋 Welcome, {user?.name || 'User'}!</h1>
        <p>Here's your account overview</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>Cart Items</h3>
            <p>{totalItems}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Value</h3>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Products</h3>
            <p>{cart.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <h3>Account</h3>
            <p className="user-email-dashboard">{user?.email || 'No email'}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          {/* ✅ FIX: Navigate to home page */}
          <button onClick={() => navigate('/')}>
            🛍️ View Products
          </button>
          {/* ✅ FIX: Navigate to cart page */}
          <button onClick={() => navigate('/cart')}>
            🛒 View Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;