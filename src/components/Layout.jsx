import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import BottomNav from './BottomNav';

function Layout({ children }) {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const publicRoutes = ['/', '/login', '/register', '/features', '/privacy', '/terms', '/contact', '/feedback'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    const userName = localStorage.getItem('userName');
    setIsAuthenticated(!!userProfile && !!userName);
  }, []);

  // Different header for logged-in users
  const LoggedInHeader = () => (
    <header className="app-header logged-in">
      <div className="header-content">
        <Link to="/dashboard" className="logo">Nextt</Link>
      </div>
    </header>
  );

  // Original header for non-logged-in users
  const PublicHeader = () => (
    <header className="app-header">
      <div className="header-content" style={{ padding: '0.5rem 0' }}>
        <Link to="/" className="logo" style={{ fontWeight: 800, fontSize: '2.5rem', fontStyle: 'italic', letterSpacing: '-0.5px', lineHeight: 1 }}>Nextt</Link>
        <nav className="nav-links">
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/login" className="login-button">Login</Link>
        </nav>
      </div>
    </header>
  );

  return (
    <div className="layout">
      <main className={!isPublicRoute ? 'main-content app-mode' : ''}>
        {isAuthenticated ? <LoggedInHeader /> : <PublicHeader />}
        {children}

        {/* Only show footer content for public routes */}
        {isPublicRoute && !isAuthenticated && (
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
              <div className="copyright">© 2024 Nextt™. All rights reserved.</div>
            </footer>
          </>
        )}
      </main>
      {isAuthenticated && !isPublicRoute && <BottomNav />}
    </div>
  );
}

export default Layout;
