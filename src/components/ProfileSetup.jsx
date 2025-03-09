import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Login.css';
import './ProfileSetup.css';

function ProfileSetup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState({
    heightFeet: '',
    heightInches: '',
    weight: '',
    sport: '',
    position: '',
    focus: ''
  });
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basics'); // basics, sport, focus

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (!storedUserName) {
      // If no name is found, redirect to registration
      navigate('/register');
      return;
    }
    setUserName(storedUserName);
  }, [navigate]);

  const sports = [
    'Basketball',
    'Football',
    'Baseball',
    'Volleyball',
    'Soccer',
    'Tennis',
    'Softball',
    'Sprinting',
    'Wrestling',
    'General Workout'
  ];

  const positionsBySport = {
    Basketball: ['Guard', 'Forward', 'Center'],
    Football: ['Quarterback', 'Skill Position', 'Linebacker', 'Lineman'],
    Baseball: ['Pitcher', 'Infield', 'Outfield', 'Catcher'],
    Softball: ['Pitcher', 'Infield', 'Outfield', 'Catcher'],
    Volleyball: ['Hitter', 'Setter', 'Blocker', 'Libero'],
    Soccer: ['Striker', 'Midfielder', 'Defender', 'Goalkeeper']
  };

  const showPositionSelect = ['Basketball', 'Football', 'Baseball', 'Softball', 'Volleyball', 'Soccer'].includes(formData.sport);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Clear any existing errors for this field
    setErrors(prev => ({ ...prev, [name]: '' }));

    // Update form data
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      // Reset position if sport changes and new sport doesn't have positions
      if (name === 'sport' && !positionsBySport[value]) {
        newData.position = '';
      }
      return newData;
    });
  };

  const validateBasicsSection = () => {
    const newErrors = {};
    if (!formData.heightFeet) newErrors.heightFeet = 'Height (feet) is required';
    if (!formData.heightInches) newErrors.heightInches = 'Height (inches) is required';
    if (parseInt(formData.heightInches) >= 12) newErrors.heightInches = 'Inches must be less than 12';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    const weight = parseInt(formData.weight);
    if (weight < 75 || weight > 999) newErrors.weight = 'Weight must be between 75 and 999 lbs';
    return newErrors;
  };

  const validateSportSection = () => {
    const newErrors = {};
    if (!formData.sport) newErrors.sport = 'Sport is required';
    if (showPositionSelect && !formData.position) newErrors.position = 'Position is required';
    return newErrors;
  };

  const validateFocusSection = () => {
    const newErrors = {};
    if (!formData.focus) newErrors.focus = 'Training focus is required';
    return newErrors;
  };

  const handleNext = () => {
    let sectionErrors = {};
    
    if (activeSection === 'basics') {
      sectionErrors = validateBasicsSection();
    } else if (activeSection === 'sport') {
      sectionErrors = validateSportSection();
    }

    if (Object.keys(sectionErrors).length === 0) {
      if (activeSection === 'basics') {
        setActiveSection('sport');
      } else if (activeSection === 'sport') {
        setActiveSection('focus');
      }
    } else {
      setErrors(sectionErrors);
    }
  };

  const handleBack = () => {
    if (activeSection === 'focus') {
      setActiveSection('sport');
    } else if (activeSection === 'sport') {
      setActiveSection('basics');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const focusErrors = validateFocusSection();
    
    if (Object.keys(focusErrors).length > 0) {
      setErrors(focusErrors);
      return;
    }

    try {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Profile setup error:', error);
      setErrors(prev => ({ ...prev, submit: 'An error occurred. Please try again.' }));
    }
  };

  const renderBasicsSection = () => (
    <div className={`form-section ${activeSection === 'basics' ? 'active' : ''}`}>
      <div className="section-header">
        <h2>Basic Information</h2>
        <p className="section-description">Let's start with your basic measurements</p>
      </div>

      <div className="height-container">
        <div className="form-group">
          <label htmlFor="heightFeet">Height (ft)</label>
          <select
            id="heightFeet"
            name="heightFeet"
            className={`form-input ${errors.heightFeet ? 'input-error' : ''}`}
            value={formData.heightFeet}
            onChange={handleInputChange}
          >
            <option value="">Select feet</option>
            {[4, 5, 6, 7, 8].map(feet => (
              <option key={feet} value={feet}>{feet} ft</option>
            ))}
          </select>
          {errors.heightFeet && <div className="error-message">{errors.heightFeet}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="heightInches">Height (in)</label>
          <select
            id="heightInches"
            name="heightInches"
            className={`form-input ${errors.heightInches ? 'input-error' : ''}`}
            value={formData.heightInches}
            onChange={handleInputChange}
          >
            <option value="">Select inches</option>
            {Array.from({length: 12}, (_, i) => (
              <option key={i} value={i}>{i} in</option>
            ))}
          </select>
          {errors.heightInches && <div className="error-message">{errors.heightInches}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="weight">Weight (lbs)</label>
        <select
          id="weight"
          name="weight"
          className={`form-input ${errors.weight ? 'input-error' : ''}`}
          value={formData.weight}
          onChange={handleInputChange}
        >
          <option value="">Select weight</option>
          {Array.from({length: 925}, (_, i) => i + 75).map(weight => (
            <option key={weight} value={weight}>{weight} lbs</option>
          ))}
        </select>
        {errors.weight && <div className="error-message">{errors.weight}</div>}
      </div>

      <button type="button" className="next-button" onClick={handleNext}>
        Next: Choose Your Sport
      </button>
    </div>
  );

  const renderSportSection = () => (
    <div className={`form-section ${activeSection === 'sport' ? 'active' : ''}`}>
      <div className="section-header">
        <h2>Sport Selection</h2>
        <p className="section-description">Tell us about your athletic focus</p>
      </div>

      <div className="form-group">
        <label htmlFor="sport">Select Your Sport</label>
        <select
          id="sport"
          name="sport"
          className={`form-input ${errors.sport ? 'input-error' : ''}`}
          value={formData.sport}
          onChange={handleInputChange}
        >
          <option value="">Select a sport</option>
          {sports.map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>
        {errors.sport && <div className="error-message">{errors.sport}</div>}
      </div>

      {showPositionSelect && (
        <div className="form-group">
          <label htmlFor="position">Select Your Position</label>
          <select
            id="position"
            name="position"
            className={`form-input ${errors.position ? 'input-error' : ''}`}
            value={formData.position}
            onChange={handleInputChange}
          >
            <option value="">Select position</option>
            {positionsBySport[formData.sport]?.map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
          {errors.position && <div className="error-message">{errors.position}</div>}
        </div>
      )}

      <div className="button-group">
        <button type="button" className="back-button" onClick={handleBack}>
          Back
        </button>
        <button type="button" className="next-button" onClick={handleNext}>
          Next: Training Focus
        </button>
      </div>
    </div>
  );

  const renderFocusSection = () => (
    <div className={`form-section ${activeSection === 'focus' ? 'active' : ''}`}>
      <div className="focus-section">
        <h2>What do you want to take to the <span className="title-nextt">Nextt</span> level?</h2>
        <p className="section-description">Choose your primary training focus</p>
        
        <div className="focus-buttons">
          <button
            type="button"
            className={`focus-button ${formData.focus === 'Strength' ? 'active' : ''}`}
            onClick={() => handleInputChange({ target: { name: 'focus', value: 'Strength' } })}
          >
            <span className="focus-icon">🏋️‍♂️</span>
            <span className="focus-text">Strength</span>
            <span className="focus-description">Build raw power and muscle</span>
          </button>
          <button
            type="button"
            className={`focus-button ${formData.focus === 'Explosiveness' ? 'active' : ''}`}
            onClick={() => handleInputChange({ target: { name: 'focus', value: 'Explosiveness' } })}
          >
            <span className="focus-icon">⚡</span>
            <span className="focus-text">Explosiveness</span>
            <span className="focus-description">Enhance speed and power</span>
          </button>
        </div>
        {errors.focus && <div className="error-message">{errors.focus}</div>}
      </div>

      <div className="button-group">
        <button type="button" className="back-button" onClick={handleBack}>
          Back
        </button>
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Create My Program
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-box profile-setup-container">
          <div className="auth-header">
            <h1>
              <span className="user-name">{userName}</span>, let's set up your profile
            </h1>
            <p className="auth-subtitle">Let's customize your training program</p>
          </div>

          <div className="progress-bar">
            <div className={`progress-step ${activeSection === 'basics' ? 'active' : ''} ${activeSection === 'sport' || activeSection === 'focus' ? 'completed' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-text">Basics</span>
            </div>
            <div className={`progress-step ${activeSection === 'sport' ? 'active' : ''} ${activeSection === 'focus' ? 'completed' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-text">Sport</span>
            </div>
            <div className={`progress-step ${activeSection === 'focus' ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-text">Focus</span>
            </div>
          </div>

          <form className="setup-form" onSubmit={handleSubmit}>
            {activeSection === 'basics' && renderBasicsSection()}
            {activeSection === 'sport' && renderSportSection()}
            {activeSection === 'focus' && renderFocusSection()}
          </form>

          {errors.submit && <div className="error-message">{errors.submit}</div>}
        </div>
      </div>
    </Layout>
  );
}

export default ProfileSetup;