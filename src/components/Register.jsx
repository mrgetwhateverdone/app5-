import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { signUp } from '../supabase';
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
    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy to continue.');
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
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: signUpError } = await signUp(
        formData.email,
        formData.password,
        formData.fullName
      );

      if (signUpError) {
        throw signUpError;
      }

      // Registration successful
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-box">
          <h2>Create Account</h2>
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
            <div className="form-group password-group">
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
                className="toggle-password"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {lastChar && <span className="last-char">{lastChar}</span>}
            </div>
            {passwordError && <div className="error-message">{passwordError}</div>}
            <div className="form-group password-group">
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
                className="toggle-password"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
              {lastConfirmChar && <span className="last-char">{lastConfirmChar}</span>}
            </div>
            {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <p className="auth-footer">
            Already have an account? <Link to="/login" className="signin-link">Sign in</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
