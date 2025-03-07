import React from 'react';
import Layout from './Layout';
import './Feedback.css';

function Feedback() {
  return (
    <Layout>
      <main className="main-content">
        <div className="content-wrapper feedback-content">
          <h1>Feedback</h1>
          <p className="feedback-text">
            Help us improve your experience with Nextt by sharing your thoughts and suggestions.
          </p>
          <div className="email-section">
            <a href="mailto:feedback@nexttapp.com" className="email-link">feedback@nexttapp.com</a>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Feedback;
