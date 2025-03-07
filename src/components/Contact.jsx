import React from 'react';
import Layout from './Layout';
import './Contact.css';

function Contact() {
  return (
    <Layout>
      <div className="contact-container">
        <div className="contact-content">
          <h1>Contact Us</h1>
          <a href="mailto:support@nexttapp.com" className="contact-email">support@nexttapp.com</a>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
