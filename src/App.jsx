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
              <div className="feature-icon">🍽️</div>
              <h3>Food Mood Tracking</h3>
              <p>Build your personal database of foods and how they make you feel physically and mentally.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Decision Tools</h3>
              <p>Use our coin toss feature when willpower fails to make better choices in moments of temptation.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>All data stays on your device. Works completely offline. No cloud syncing required.</p>
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
