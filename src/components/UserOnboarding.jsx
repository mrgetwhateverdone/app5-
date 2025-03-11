import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './UserOnboarding.css';

function UserOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    sport: '',
    position: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const userProfile = localStorage.getItem('userProfile');
    const userName = localStorage.getItem('userName');
    
    if (!userProfile || !userName) {
      navigate('/login');
      return;
    }

    // Check if onboarding is already completed
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (onboardingCompleted === 'true') {
      navigate('/dashboard');
      return;
    }

    // Pre-fill name from registration
    const profile = JSON.parse(userProfile);
    setFormData(prev => ({
      ...prev,
      name: userName || profile.fullName || ''
    }));
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) {
        setError('Please enter your name');
        return false;
      }
      if (!formData.heightFeet || !formData.heightInches) {
        setError('Please enter your height');
        return false;
      }
      if (!formData.weight) {
        setError('Please enter your weight');
        return false;
      }
    } else if (step === 2) {
      if (!formData.sport.trim()) {
        setError('Please select a sport');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) {
      return;
    }

    setLoading(true);

    try {
      // Save user profile data to localStorage
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const updatedProfile = {
        ...userProfile,
        heightFeet: formData.heightFeet,
        heightInches: formData.heightInches,
        weight: formData.weight,
        sport: formData.sport,
        position: formData.position || 'N/A',
        focus: 'strength', // Default focus value until user creates a workout plan
        onboardingCompleted: true
      };

      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      localStorage.setItem('onboardingCompleted', 'true');

      // Initialize exercise progress tracking
      localStorage.setItem('exerciseProgress', JSON.stringify({}));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Updated sports list based on user requirements
  const sports = [
    'Basketball', 'Football', 'Volleyball', 'Soccer', 'Baseball & Softball', 
    'Tennis', 'Sprinting', 'Wrestling', 'General Workout'
  ];

  // Updated positions based on user requirements
  const positions = {
    Basketball: ['Guard', 'Forward', 'Center'],
    Football: ['Quarterback', 'Running Back', 'Skill Position', 'Linebacker', 'Lineman'],
    Volleyball: ['Hitter', 'Setter', 'Blocker', 'Libero'],
    Soccer: ['Striker', 'Midfielder', 'Defender', 'Goalkeeper'],
    'Baseball & Softball': ['Pitcher', 'Infield', 'Outfield', 'Catcher'],
    Tennis: [], // No specific positions for Tennis
    Sprinting: [], // No specific positions for Sprinting
    Wrestling: [], // No specific positions for Wrestling
    'General Workout': [] // No specific positions for General Workout
  };

  const renderStep1 = () => (
    <>
      <h2>Tell us about yourself</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your name"
          className="onboarding-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="height">Height</label>
        <div className="height-inputs">
          <div className="height-input-group">
            <input
              type="number"
              id="heightFeet"
              name="heightFeet"
              value={formData.heightFeet}
              onChange={handleInputChange}
              placeholder="Feet"
              min="4"
              max="8"
              className="onboarding-input"
            />
            <span>ft</span>
          </div>
          <div className="height-input-group">
            <input
              type="number"
              id="heightInches"
              name="heightInches"
              value={formData.heightInches}
              onChange={handleInputChange}
              placeholder="Inches"
              min="0"
              max="11"
              className="onboarding-input"
            />
            <span>in</span>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="weight">Weight (lbs)</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          placeholder="Your weight in pounds"
          min="50"
          max="400"
          className="onboarding-input"
        />
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h2>Your Sport</h2>
      <div className="form-group">
        <label htmlFor="sport">What sport do you play?</label>
        <select
          id="sport"
          name="sport"
          value={formData.sport}
          onChange={handleInputChange}
          className="onboarding-select"
        >
          <option value="">Select a sport</option>
          {sports.map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>
      </div>

      {formData.sport && positions[formData.sport] && (
        <div className="form-group">
          <label htmlFor="position">What position do you play?</label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="onboarding-select"
          >
            <option value="">Select a position</option>
            {positions[formData.sport].map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>
      )}
    </>
  );

  return (
    <Layout>
      <div className="onboarding-container">
        <div className="onboarding-box">
          <div className="onboarding-progress">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}

            <div className="onboarding-buttons">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={handleBack}
                  className="back-button"
                >
                  Back
                </button>
              )}
              
              {step < 2 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="next-button"
                >
                  Next
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Complete Setup'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default UserOnboarding;
