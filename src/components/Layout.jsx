import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import BottomNav from './BottomNav';
import { auth, signOut } from '../services/firebase';

function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const publicRoutes = ['/', '/login', '/register', '/privacy', '/terms', '/contact', '/feedback', '/features'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    // Check if user is authenticated with Firebase
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
    
    // Clean up subscription
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Don't show navigation on login, register, and password reset pages
  const hideNavigation = ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname);

  if (hideNavigation) {
    return <main className="main-content">{children}</main>;
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>Nextt</Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
        </button>
      </header>
      
      <div className={`navigation ${isMenuOpen ? 'open' : ''}`}>
        <nav className="nav">
          <ul className="nav-list">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/progress" onClick={closeMenu}>Progress</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" onClick={closeMenu}>Profile</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="logout-button">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" onClick={closeMenu}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" onClick={closeMenu}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      
      <main className="main-content">{children}</main>

      {/* Footer - only on public routes */}
      {(isPublicRoute) && (
        <>
          {location.pathname !== '/login' && location.pathname !== '/register' && (
            <div className="feedback-button-container">
              <Link 
                to="/feedback"
                className="feedback-button" 
                onMouseDown={(e) => e.currentTarget.classList.add('feedback-button-pressed')}
                onMouseUp={(e) => e.currentTarget.classList.remove('feedback-button-pressed')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('feedback-button-pressed')}
              >
                Leave Feedback
              </Link>
            </div>
          )}

          <div className="social-icons-container">
            <a
              href="https://instagram.com/nexttapp"
              target="_blank"
              rel="noreferrer"
              className="social-icon-link"
              title="Follow on Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" style={{ fontSize: '1.3em' }} />
            </a>
            <a
              href="https://x.com/nextt_app"
              target="_blank"
              rel="noreferrer"
              className="social-icon-link"
              title="Follow on X"
            >
              <FontAwesomeIcon icon={faXTwitter} size="lg" style={{ fontSize: '1.3em' }} />
            </a>
          </div>

          <footer className="app-footer">
            <div className="footer-content">
              <nav className="footer-links">
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                <Link to="/terms" className="footer-link">Terms of Service</Link>
                <Link to="/contact" className="footer-link">Contact</Link>
              </nav>
            </div>
            <div className="copyright"> 2025 Nextt. All rights reserved.</div>
          </footer>
        </>
      )}

      {/* Bottom navigation for authenticated users - always show on authenticated pages */}
      {isAuthenticated && <BottomNav location={location} />}
    </div>
  );
}

export default Layout;
