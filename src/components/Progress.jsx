import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import './Progress.css';

function Progress() {
  const [metrics, setMetrics] = useState({
    totalWeight: 0,
    totalReps: 0,
    workoutCount: 0
  });

  useEffect(() => {
    // Load workout history from localStorage
    const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    
    // Calculate metrics
    const calculatedMetrics = workoutHistory.reduce((acc, workout) => {
      workout.exercises.forEach(exercise => {
        acc.totalWeight += exercise.weight * exercise.reps;
        acc.totalReps += exercise.reps;
      });
      return acc;
    }, {
      totalWeight: 0,
      totalReps: 0,
      workoutCount: workoutHistory.length
    });

    setMetrics(calculatedMetrics);
  }, []);

  return (
    <Layout>
      <div className="progress-container">
        <div className="progress-header">
          <h1>Your Progress</h1>
          <Link to="/profile" className="back-button">
            ← Back
          </Link>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-icon">🏋️‍♂️</span>
            <div className="metric-content">
              <span className="metric-value">{metrics.totalWeight.toLocaleString()}</span>
              <span className="metric-label">Total Weight (lbs)</span>
            </div>
          </div>

          <div className="metric-card">
            <span className="metric-icon">🔄</span>
            <div className="metric-content">
              <span className="metric-value">{metrics.totalReps.toLocaleString()}</span>
              <span className="metric-label">Total Reps</span>
            </div>
          </div>

          <div className="metric-card">
            <span className="metric-icon">📊</span>
            <div className="metric-content">
              <span className="metric-value">{metrics.workoutCount}</span>
              <span className="metric-label">Workouts Completed</span>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h2>Progress Over Time</h2>
          <div className="chart-placeholder">
            {/* TODO: Implement chart visualization */}
            <p className="empty-state">Complete your first workout to see your progress chart!</p>
          </div>
        </div>

        <nav className="mobile-nav">
          <Link to="/dashboard" className="nav-item">
            <span className="nav-icon">🏋️‍♂️</span>
            <span className="nav-label">Workout</span>
          </Link>
          <Link to="/rehab" className="nav-item">
            <span className="nav-icon">🧰</span>
            <span className="nav-label">Rehab</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <span className="nav-icon">👤</span>
            <span className="nav-label">Profile</span>
          </Link>
        </nav>
      </div>
    </Layout>
  );
}

export default Progress; 