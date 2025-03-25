import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './UserOnboarding.css';
import { auth, updateUserProfile, getUserProfile, updateOnboardingStatus } from '../services/firebase';

function UserOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }
        
        setIsAuthenticated(true);
        
        // Get user profile from Firebase
        const { profile, error } = await getUserProfile(user.uid);
        
        if (error) {
          console.error("Error getting user profile:", error);
          setError("Error loading your profile. Please try again.");
          setLoading(false);
          return;
        }
        
        if (profile) {
          setUserProfile(profile);
          
          // Check if onboarding is already completed
          if (profile.onboardingCompleted) {
            navigate('/dashboard');
            return;
          }
        } else {
          setError("Profile not found. Please set up your profile first.");
          navigate('/profile-setup');
          return;
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error in onboarding setup:", err);
        setError("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }
      
      // Update onboarding status in Firebase
      await updateOnboardingStatus(user.uid, true);
      
      // Update any other profile changes if needed
      if (userProfile) {
        const updatedProfile = {
          ...userProfile,
          onboardingCompleted: true
        };
        
        await updateUserProfile(user.uid, updatedProfile);
      }
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error("Error completing onboarding:", err);
      setError("Failed to complete onboarding. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading-message">Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="error-message">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="onboarding-container">
        <div className="onboarding-header">
          <h1>Welcome to <span className="brand-text">Nextt</span></h1>
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}></div>
          </div>
        </div>

        <div className="onboarding-content">
          {currentStep === 1 && (
            <div className="onboarding-step">
              <h2>Personalized Workout Plans</h2>
              <div className="feature-image feature-1"></div>
              <p>Your workout plans are tailored to your sport, position, and body type to maximize your athletic potential.</p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="onboarding-step">
              <h2>Progress Tracking</h2>
              <div className="feature-image feature-2"></div>
              <p>Track your improvement over time with detailed metrics and visualizations of your progress.</p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="onboarding-step">
              <h2>Injury Prevention</h2>
              <div className="feature-image feature-3"></div>
              <p>Access sport-specific rehab and prehab exercises to prevent injuries and recover faster.</p>
            </div>
          )}
        </div>

        <div className="onboarding-actions">
          {currentStep > 1 && (
            <button className="back-button" onClick={handleBack}>Back</button>
          )}
          
          <button className="action-button" onClick={handleContinue}>
            {currentStep < 3 ? 'Continue' : 'Get Started'}
          </button>
          
          {currentStep < 3 && (
            <button className="skip-button" onClick={handleSkip}>Skip Tour</button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default UserOnboarding;
