import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <AlertCircle size={100} className="not-found-icon" />
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <button onClick={() => navigate('/')} className="home-btn">
          <Home size={20} />
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;