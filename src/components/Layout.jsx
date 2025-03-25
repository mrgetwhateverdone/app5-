import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import BottomNav from './BottomNav';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Layout({ children }) {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const publicRoutes = ['/', '/login', '/register', '/privacy', '/terms', '/contact', '/feedback', '/features'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    // Use Firebase auth state instead of localStorage
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      
      // Update localStorage for backward compatibility with other components
      if (user) {
        if (!localStorage.getItem('userProfile')) {
          // If no profile in localStorage, we'll need to handle this in the component
          // that needs it by fetching from Firebase
        }
      } else {
        // User is signed out
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userName');
      }
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <div className="app-container">
      {/* Header - shown on all pages */}
      <header className={`app-header ${isAuthenticated && !isPublicRoute ? 'logged-in' : ''}`}>
        <div className="header-content">
          {isAuthenticated && !isPublicRoute ? (
            <>
              <div className="header-left">
                <span className="logo" style={{ color: '#d4af37', cursor: 'default' }}>Nextt</span>
                <Link to="/progress" className="nav-link" style={{ fontSize: '1.2em', marginLeft: '5px' }}>📈</Link>
              </div>
              <div className="header-right">
                {/* Empty right side */}
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="logo">Nextt</Link>
              <nav className="nav-links">
                <Link to="/login" className="login-button">Login</Link>
              </nav>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      {children}

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
