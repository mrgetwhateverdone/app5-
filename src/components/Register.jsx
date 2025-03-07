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
  const lastCharTimerRef = useRef(null);
  const lastConfirmCharTimerRef = useRef(null);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    if (!formData.fullName || !formData.email) {
      alert('Please fill in all fields');
      return;
    }

    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <Layout>
      <main className="main-content">
        <div className="content-wrapper login-content">
          <div className="login-container">
            <div className="login-header">
              <h1>Create your account</h1>
              <p>Or <Link to="/login" className="signin-link">sign in to your existing account</Link></p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Nice to meet you, let's get to work!"
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Create a password"
                    className={`form-input ${passwordError ? 'input-error' : ''}`}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  {passwordError && <div className="error-message">{passwordError}</div>}
                  {!showPassword && lastChar && (
                    <span className="last-char">{lastChar}</span>
                  )}
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🔒' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className={`form-input ${confirmPasswordError ? 'input-error' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                  {!showConfirmPassword && lastConfirmChar && (
                    <span className="last-char">{lastConfirmChar}</span>
                  )}
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '🔒' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="form-checkbox">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="checkbox-input"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="checkbox-label">
                  I agree to the <Link to="/terms" className="text-link">Terms of Service</Link> and{' '}
                  <Link to="/privacy" className="text-link">Privacy Policy</Link>.
                </label>
              </div>

              <button type="submit" className="submit-button">Create Account</button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Register;
