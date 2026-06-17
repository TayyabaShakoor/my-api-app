// src/pages/LoginPage.js
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useCartStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to visit before login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login(email, password);
      
      toast.success('✅ Login successful! Welcome back!', {
        style: {
          background: '#48bb78',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          fontSize: '16px',
        },
      });
      
      // Redirect to the page user wanted to visit
      navigate(from, { replace: true });
      
    } catch (error) {
      toast.error(`❌ ${error.message}`, {
        style: {
          background: '#e53e3e',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          fontSize: '16px',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🔐 Welcome Back</h1>
          <p>Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
            />
            <small>Demo: Any email/password (min 6 chars)</small>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? '⏳ Logging in...' : '🔐 Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo credentials: any email + any password (6+ chars)</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;