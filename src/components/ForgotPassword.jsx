import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { resetPasswordForEmail } from '../supabase';
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
      const { error: resetError } = await resetPasswordForEmail(email);

      if (resetError) {
        throw resetError;
      }

      setSuccess('Password reset instructions have been sent to your email');
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Password reset instructions have been sent to your email' }
        });
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
