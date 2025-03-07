import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivacyPolicy from './components/PrivacyPolicy';
import './components/PrivacyPolicy.css';
import TermsOfService from './components/TermsOfService';
import './components/TermsOfService.css';
import Contact from './components/Contact';
import './components/Contact.css';

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
            <h2>Stop making food choices you regret</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="check-icon">✓</span>
                Track how foods make you feel and learn from past experiences
              </div>
            </div>
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
      </Routes>
    </Router>
  );
}

export default App;
