import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Login.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [lastChar, setLastChar] = useState('');
  const [lastConfirmChar, setLastConfirmChar] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const lastCharTimerRef = useRef(null);
  const lastConfirmCharTimerRef = useRef(null);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setError(''); // Clear any previous errors

    if (id === 'password') {
      if (value.length > 0) {
        const lastCharacter = value[value.length - 1];
        setLastChar(lastCharacter);
        clearTimeout(lastCharTimerRef.current);
        lastCharTimerRef.current = setTimeout(() => setLastChar(''), 1000);
      }
      const error = validatePassword(value);
      setPasswordError(error);
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }

    if (id === 'confirmPassword') {
      if (value.length > 0) {
        const lastCharacter = value[value.length - 1];
        setLastConfirmChar(lastCharacter);
        clearTimeout(lastConfirmCharTimerRef.current);
        lastConfirmCharTimerRef.current = setTimeout(() => setLastConfirmChar(''), 1000);
      }
      if (value !== formData.password) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate terms acceptance
    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }

    // Validate full name
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some(user => user.email === formData.email.trim());
      
      if (userExists) {
        setError('An account with this email already exists');
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: formData.email.trim(),
        password: formData.password,
        fullName: formData.fullName.trim(),
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Set current user
      localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName
      }));

      // Redirect to profile setup
      navigate('/profile-setup', { replace: true });
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h2>Let's reach your <span className="floating-text">Nexxt</span> level</h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="auth-input"
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
                  className={`auth-input ${passwordError ? 'error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`toggle-password ${showPassword ? 'unlocked' : ''}`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-tooltip={showPassword ? "Hide password" : "Show password"}
                />
                {lastChar && <span className="last-char">{lastChar}</span>}
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>

            <div className="form-group">
              <div className="password-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`auth-input ${confirmPasswordError ? 'error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`toggle-password ${showConfirmPassword ? 'unlocked' : ''}`}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  data-tooltip={showConfirmPassword ? "Hide password" : "Show password"}
                />
                {lastConfirmChar && <span className="last-char">{lastConfirmChar}</span>}
              </div>
              {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms">
                I accept the <Link to="/terms" className="text-link">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="text-link">Privacy Policy</Link>
              </label>
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <span className="button-content">
                  <span className="spinner"></span>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>Want to pick up where you left off? <Link to="/login" className="signin-link" style={{ color: '#d4af37' }}>Sign in</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
