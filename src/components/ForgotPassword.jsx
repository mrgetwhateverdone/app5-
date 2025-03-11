import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Login.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some(user => user.email === email.trim());

      if (!userExists) {
        throw new Error('No account found with this email address');
      }

      // Store the email for password reset
      localStorage.setItem('resetPasswordEmail', email.trim());

      setSuccess('Password reset link generated');
      setTimeout(() => {
        navigate('/reset-password');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error sending reset instructions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-box">
          <h2>Reset Password</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>
            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
          </form>
          <p className="auth-footer">
            Remember your password? <Link to="/login" className="signin-link">Sign in</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
