import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Layout({ children }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="logo" style={{ fontWeight: 800, fontSize: '2.5rem', fontStyle: 'italic', letterSpacing: '-0.5px' }}>Nextt</Link>
          <nav className="nav-links">
            <span className="nav-link">Features</span>
            <button className="login-button" onClick={() => alert('Login functionality coming soon!')}>Login</button>
          </nav>
        </div>
      </header>

      {children}

      <div className="feedback-button-container">
        <button 
          className="feedback-button" 
          onClick={() => alert('Feedback form coming soon!')}
          onMouseDown={(e) => e.currentTarget.classList.add('feedback-button-pressed')}
          onMouseUp={(e) => e.currentTarget.classList.remove('feedback-button-pressed')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('feedback-button-pressed')}
        >
          Leave Feedback
        </button>
      </div>
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
    </div>
  );
}

export default Layout;
