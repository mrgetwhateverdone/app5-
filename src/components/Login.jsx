import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import './Login.css';
import { signInWithEmailAndPassword, getUserProfile } from '../services/firebase';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect destination from the location state, or default to /dashboard
  const destination = location.state?.from || '/dashboard';
  
  useEffect(() => {
    // Clear any errors when component mounts
    setError('');
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
    // Clear error when user starts typing
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic form validation
    if (!credentials.email) {
      setError('Email is required');
      return;
    }
    
    if (!credentials.password) {
      setError('Password is required');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setLoading(true);
      
      // Attempt to sign in with Firebase
      const { user, error: signInError } = await signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      );
      
      if (signInError) {
        console.error("Sign in error:", signInError);
        
        // Handle different Firebase auth errors with user-friendly messages
        if (
          signInError.code === 'auth/invalid-credential' || 
          signInError.code === 'auth/user-not-found' ||
          signInError.code === 'auth/wrong-password'
        ) {
          setError('Invalid email or password');
        } else if (signInError.code === 'auth/invalid-email') {
          setError('Invalid email format');
        } else if (signInError.code === 'auth/user-disabled') {
          setError('This account has been disabled');
        } else if (signInError.code === 'auth/too-many-requests') {
          setError('Too many failed login attempts. Please try again later or reset your password');
        } else if (signInError.code === 'auth/operation-not-allowed') {
          setError('Login is currently disabled');
        } else if (signInError.code === 'auth/configuration-not-found') {
          setError('Authentication service is not configured correctly');
        } else {
          setError('Login failed. Please try again.');
        }
        
        setLoading(false);
        return;
      }
      
      if (!user) {
        setError('Failed to log in. Please try again.');
        setLoading(false);
        return;
      }
      
      console.log(`User logged in successfully: ${user.uid}`);
      
      // Fetch user profile from Firestore
      const { profile } = await getUserProfile(user.uid);
      
      // Navigate to the destination
      navigate(destination);
      
    } catch (err) {
      console.error("Unexpected error during login:", err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="login-container">
        <div className="login-form-container">
          <h1>Welcome Back</h1>
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="********"
                required
              />
            </div>
            
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </form>
          
          <div className="register-prompt">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
