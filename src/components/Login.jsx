import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [lastChar, setLastChar] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const lastCharTimerRef = useRef(null);

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Here you would implement actual login logic
      // For now, simulate a successful login
      localStorage.setItem('userEmail', formData.email);
      navigate('/profile-setup');
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <Layout>
      <main className="main-content">
        <div className="content-wrapper login-content">
          <div className="login-container">
            <div className="login-header">
              <h1>Sign in to your account</h1>
              <p>Don't have an account? <Link to="/register" className="signin-link">Create one now</Link></p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="contact@nextt.app"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                </div>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
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

              <button type="submit" className="submit-button">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Login;
