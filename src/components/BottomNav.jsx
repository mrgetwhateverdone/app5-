import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

function BottomNav() {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link 
        to="/dashboard" 
        className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
      >
        <span className="nav-icon">💪</span>
        <span className="nav-text">Workouts</span>
      </Link>
      <Link 
        to="/rehab" 
        className={`nav-item ${location.pathname === '/rehab' ? 'active' : ''}`}
      >
        <span className="nav-icon">🏥</span>
        <span className="nav-text">Rehab</span>
      </Link>
      <Link 
        to="/profile" 
        className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
      >
        <span className="nav-icon">👤</span>
        <span className="nav-text">Profile</span>
      </Link>
    </nav>
  );
}

export default BottomNav; 