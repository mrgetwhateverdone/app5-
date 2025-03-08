import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import './Profile.css';

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [workouts, setWorkouts] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const handleAddMeasurement = () => {
    // TODO: Implement measurement addition
    console.log('Add measurement clicked');
  };

  return (
    <Layout>
      <div className="profile-container">
        <Link to="/progress" className="progress-header">
          <span className="progress-text">View Your Progress</span>
          <span className="progress-icon">📈</span>
        </Link>

        <div className="profile-section gym-section">
          <div className="section-icon">🏠</div>
          <div className="section-content">
            <span className="section-title">Your gym</span>
            <span className="new-tag">NEW!</span>
          </div>
          <span className="section-value">My gym</span>
        </div>

        <div className="profile-section weight-section">
          <div className="section-icon">⚖️</div>
          <div className="section-content">
            <span className="section-title">Bodyweight</span>
          </div>
          <div className="weight-value">
            <span>{userProfile?.weight || '0'} lb</span>
            <button className="add-button">+</button>
          </div>
        </div>

        <button className="action-button" onClick={handleAddMeasurement}>
          Add measurement
        </button>

        <Link to="/basic-info" className="action-button">
          Basic info
        </Link>

        <Link to="/help" className="action-button">
          Help
        </Link>

        <nav className="mobile-nav">
          <Link to="/dashboard" className="nav-item">
            <span className="nav-icon">🏋️‍♂️</span>
            <span className="nav-label">Workout</span>
          </Link>
          <Link to="/rehab" className="nav-item">
            <span className="nav-icon">🧰</span>
            <span className="nav-label">Rehab</span>
          </Link>
          <Link to="/profile" className="nav-item active">
            <span className="nav-icon">👤</span>
            <span className="nav-label">Profile</span>
          </Link>
        </nav>
      </div>
    </Layout>
  );
}

export default Profile; 