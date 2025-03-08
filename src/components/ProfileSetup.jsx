import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Login.css';
import './ProfileSetup.css';

function ProfileSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    sport: '',
    position: '',
    focus: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      setFormData(prev => ({ ...prev, name: userName }));
    }
  }, []);

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

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.heightFeet) newErrors.heightFeet = 'Height (feet) is required';
    if (!formData.heightInches) newErrors.heightInches = 'Height (inches) is required';
    if (parseInt(formData.heightInches) >= 12) newErrors.heightInches = 'Inches must be less than 12';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    const weight = parseInt(formData.weight);
    if (weight < 75 || weight > 999) newErrors.weight = 'Weight must be between 75 and 999 lbs';
    if (!formData.sport) newErrors.sport = 'Sport is required';
    if (showPositionSelect && !formData.position) newErrors.position = 'Position is required';
    if (!formData.focus) newErrors.focus = 'Training focus is required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      // Reset position when sport changes
      if (name === 'sport' && !positionsBySport[value]) {
        newData.position = '';
      }
      return newData;
    });
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/dashboard', { replace: true }); // Use replace to prevent going back to setup
    } catch (error) {
      console.error('Profile setup error:', error);
      setErrors(prev => ({ ...prev, submit: 'An error occurred. Please try again.' }));
    }
  };

  return (
    <Layout>
      <main className="main-content">
        <div className="content-wrapper login-content">
          <div className="login-container profile-setup-container">
            <div className="login-header">
              <h1>Set up your profile</h1>
              <p>Let's customize your training program</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
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
                      <option key={feet} value={feet}>{feet}</option>
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
                      <option key={i} value={i}>{i}</option>
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

              <div className="form-group">
                <label htmlFor="sport">Sport</label>
                <select
                  id="sport"
                  name="sport"
                  className={`form-input ${errors.sport ? 'input-error' : ''}`}
                  value={formData.sport}
                  onChange={handleInputChange}
                >
                  <option value="">Select your sport</option>
                  {sports.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
                {errors.sport && <div className="error-message">{errors.sport}</div>}
              </div>

              {showPositionSelect && (
                <div className="form-group">
                  <label htmlFor="position">Position</label>
                  <select
                    id="position"
                    name="position"
                    className={`form-input ${errors.position ? 'input-error' : ''}`}
                    value={formData.position}
                    onChange={handleInputChange}
                  >
                    <option value="">Select your position</option>
                    {positionsBySport[formData.sport]?.map(position => (
                      <option key={position} value={position}>{position}</option>
                    ))}
                  </select>
                  {errors.position && <div className="error-message">{errors.position}</div>}
                </div>
              )}

              <div className="focus-section">
                <h2>What do you want to take to the <span className="title-nextt">Nextt</span> level?</h2>
                <div className="focus-buttons">
                  <button
                    type="button"
                    className={`focus-button ${formData.focus === 'Strength' ? 'active' : ''}`}
                    onClick={() => handleInputChange({ target: { name: 'focus', value: 'Strength' } })}
                  >
                    Strength
                  </button>
                  <button
                    type="button"
                    className={`focus-button ${formData.focus === 'Explosiveness' ? 'active' : ''}`}
                    onClick={() => handleInputChange({ target: { name: 'focus', value: 'Explosiveness' } })}
                  >
                    Explosiveness
                  </button>
                </div>
                {errors.focus && <div className="error-message">{errors.focus}</div>}
              </div>

              {errors.submit && <div className="error-message">{errors.submit}</div>}

              <button type="submit" className="submit-button">
                Create My Program
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default ProfileSetup;
