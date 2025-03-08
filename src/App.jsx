import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PrivacyPolicy from './components/PrivacyPolicy';
import './components/PrivacyPolicy.css';
import TermsOfService from './components/TermsOfService';
import './components/TermsOfService.css';
import Contact from './components/Contact';
import './components/Contact.css';
import Feedback from './components/Feedback';
import './components/Feedback.css';
import Features from './components/Features';
import './components/Features.css';
import Login from './components/Login';
import Register from './components/Register';
import ProfileSetup from './components/ProfileSetup';
import './components/Login.css';
import './components/ProfileSetup.css';

function Home() {
  return (
    <Layout>
      <main className="main-content">
        <div className="content-wrapper">
          <h1 className="main-title"><span className="title-prefix">Are you</span> <span className="title-nextt">Nextt</span><span className="title-prefix">?</span></h1>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Personalized Plans</h3>
              <p>Workout plans tailored to your sport, position, and body type</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Monitor your improvements with detailed analytics</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>6-Week Programs</h3>
              <p>Structured training cycles with progressive overload</p>
            </div>
          </div>

          <div className="why-section">
            <div className="sports-container">
              <div className="sports-slot">
                <div className="sports-reel reel1"></div>
                <div className="sports-reel reel2"></div>
                <div className="sports-reel reel3"></div>
              </div>
            </div>
            <h2>Built by a college athlete, for college athletes.</h2>
            <p className="why-description">
              This platform is designed for current college athletes and those who are training to become one. It creates custom 6-week workout plans based on your sport, position, body type, and training goals while tracking your progress as you make improvements. Whether you're focused on increasing your strength, or looking to improve your athletic ability, I've got you covered with sport-specific exercises and workouts that simulate collegiate level athletic training, with injury prevention rehab included, that will elevate your game and take you to the <span className="title-nextt">Nextt</span> level.
            </p>
            <Link to="/register" className="cta-button">Start Your Journey</Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
