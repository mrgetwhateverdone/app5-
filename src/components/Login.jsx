import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastChar, setLastChar] = useState('');
  const lastCharTimerRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setError(''); // Clear any previous errors

    // Show last character for password field
    if (id === 'password' && value.length > 0) {
      const lastCharacter = value[value.length - 1];
      setLastChar(lastCharacter);
      clearTimeout(lastCharTimerRef.current);
      lastCharTimerRef.current = setTimeout(() => setLastChar(''), 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');

    // Validate form fields
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!formData.password.trim()) {
      setError('Please enter your password');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting login with:', { email: formData.email.trim() });
      
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => 
        u.email === formData.email.trim() && 
        u.password === formData.password
      );

      if (!user) {
        setError('Invalid email or password. Please check your credentials and try again.');
        setLoading(false);
        return;
      }

      console.log('Login successful');
      
      // Set current user and profile in localStorage
      const userProfile = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt
      };

      localStorage.setItem('currentUser', JSON.stringify(userProfile));
      localStorage.setItem('userName', user.fullName);
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      
      // Get the intended destination from location state, or default to dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      console.log('Redirecting to:', from);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h2><span className="floating-text">Nextt</span></h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="auth-input"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <div className="password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="auth-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`toggle-password ${showPassword ? 'unlocked' : ''}`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-tooltip={showPassword ? "Hide password" : "Show password"}
                />
                <span className="last-char" style={{opacity: lastChar ? 1 : 0, transition: 'opacity 0.5s'}}>{lastChar}</span>
              </div>
            </div>

            <Link to="/forgot-password" className="forgot-password-link">
              Forgot your password?
            </Link>

            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <span className="button-content">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>Ready to reach your Nextt level?</p>
            <Link to="/register" className="create-account-link" style={{ color: '#d4af37' }}>
              Create Your Account
            </Link>
          </div>

          <div className="help-text">
            <p>Need help? <Link to="/contact" className="text-link">Contact Support</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
