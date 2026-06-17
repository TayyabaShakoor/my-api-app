// src/components/AuthGuard.js
import { Navigate, useLocation } from 'react-router-dom';
import useCartStore from '../store/cartStore';

function AuthGuard({ children }) {
  const isAuthenticated = useCartStore((state) => state.isAuthenticated);
  const location = useLocation();

  // If not authenticated, redirect to login
  // But save the current location so we can redirect back after login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, show the protected component
  return children;
}

export default AuthGuard;