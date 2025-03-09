import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import './Features.css';

function Features() {
  return (
    <Layout>
      <main className="main-content">
        <div className="content-wrapper features-content">
          <h1 className="features-title">Reach your <span className="title-nextt">Nextt</span> level</h1>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Personalized Plans</h3>
              <p>Custom workout plans for your sport and position</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Injury Prevention</h3>
              <p>Warm-up routines and recovery exercises</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Monitor and analyze your improvements</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Coach</h3>
              <p>A personalized strength coach right in your pocket</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Strength Training</h3>
              <p>Sport-specific exercises to enhance performance</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>6-Week Programs</h3>
              <p>Progressive training cycles for optimal results</p>
            </div>
          </div>

          <div className="features-highlight">
            <h2>Are you <span className="title-nextt">Nextt</span> ?</h2>
            <p>Experience collegiate-level training designed specifically for you. This platform uses scientifically proven training methods to help you improve your performance, prevent nagging injuries, and achieve your goals.</p>
            <Link to="/login" className="cta-button">Start Your Journey</Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Features;
