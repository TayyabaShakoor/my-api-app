// src/pages/NotFoundPage.js
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="home-link">
          🏠 Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;