import React from 'react';
import Layout from './Layout';
import './Contact.css';

function Contact() {
  return (
    <Layout>
      <div className="contact-container">
        <div className="contact-content">
          <h1>Contact Us</h1>
          <a href="mailto:contact@nextt.app" className="contact-email">contact@nextt.app</a>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
