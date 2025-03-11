import React from 'react';

import Layout from './Layout';

function PrivacyPolicy() {
  return (
    <Layout>
      <div className="privacy-container">
        <div className="privacy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: March 11, 2025</p>
        
        <p>I take your privacy seriously. This Privacy Policy outlines my practices concerning the handling of user data in accordance with Missouri state law and other applicable regulations.</p>
        
        <section>
          <h2>Data Collection and Storage</h2>
          <p>As a Missouri resident and individual developer, I have designed my app with privacy at its core, adhering to Missouri data protection standards (§407.1500, RSMo). I do not collect, store, or transmit any personal health data to external servers. I personally maintain and oversee all security measures as required by state law.</p>
          <p>While my app processes health-related information for fitness tracking purposes, it is important to note several key points regarding data handling and privacy. I am not a covered entity under HIPAA or Missouri health information laws, and the data you enter is not considered an Electronic Health Record under Missouri law. All health-related data is stored locally on your device, and you maintain full control over your health data at all times. I implement security measures that meet or exceed Missouri's standards for protecting sensitive personal information.</p>
        </section>

        <section>
          <h2>Website Analytics</h2>
          <p>As an individual developer, I use privacy-focused analytics to collect anonymous usage data, which helps me improve the app experience. The analytics data collected includes: page views, referring websites, and general location data. This data is anonymized and cannot be used to identify individual users. I personally ensure that all analytics comply with Missouri privacy standards.</p>
        </section>

        <section>
          <h2>Subscription and Payment Data</h2>
          <p>When you purchase a subscription, the payment processing is handled securely by established payment processors. As an individual developer, I do not store or have access to your payment information. I only maintain necessary subscription status information to validate your access to premium features.</p>
        </section>

        <section>
          <h2>Missouri Health and Fitness Industry Compliance</h2>
          <p>As an individual developer providing fitness-related services from Missouri, I adhere to all applicable state regulations regarding health and fitness services. This includes clear disclosure that I am not providing medical advice or professional training services, compliance with Missouri consumer protection laws regarding fitness services, adherence to Missouri regulations on digital fitness platforms, and implementation of safety warnings and disclaimers as required by state law.</p>
        </section>

        <section>
          <h2>Data Usage and Biometric Information</h2>
          <p>Your food tracking data remains on your device, and you maintain complete control over this information. Subscription status and minimal account data may be stored securely to maintain your access to the service.</p>
          <p>While my app may process health and fitness-related information, I do not collect, store, or share any biometric data (such as fingerprints, facial recognition, or other unique biological patterns). In accordance with Missouri privacy laws, I do not collect or store any biometric identifiers, do not use any biometric recognition technology, process all health-related data locally on your device, and ensure you have the ability to delete all your data at any time.</p>
        </section>

        <section>
          <h2>Data Sharing and Missouri Data Protection</h2>
          <p>As an individual developer, I do not share any personal data with third parties. While anonymous analytics data may be processed by my analytics provider under strict privacy agreements, I personally ensure that all data sharing practices comply with Missouri's data protection laws, including the Missouri Data Security Law (§407.1500, RSMo) regarding data breach notifications and security measures.</p>
        </section>

        <section>
          <h2>Children's Privacy and Student Data</h2>
          <p>As an individual developer, I have designed my service to not be directed to children under 13 years of age. I take this responsibility seriously and do not knowingly collect any data from children under 13.</p>
          <p>For educational institutions in Missouri using my service, I comply with the Missouri Student Data Privacy Law (§161.096, RSMo). This compliance includes not collecting student data beyond what is necessary for the use of my service, not using student data for targeted advertising, not selling or renting student data to any third parties, implementing appropriate security measures to protect student data, and providing complete transparency about my data collection and use practices.</p>
        </section>

        <section>
          <h2>Your Rights as a Missouri Resident</h2>
          <p>Under Missouri law and other applicable regulations, you have specific rights regarding your data. These rights include accessing your account data, requesting deletion of your account, exporting your data, receiving prompt notification of any data breaches affecting your personal information, filing a complaint with the Missouri Attorney General's Consumer Protection Division, and exercising all rights granted under Missouri's data privacy and consumer protection laws.</p>
        </section>

        <section>
          <h2>Data Breach Notifications</h2>
          <p>In accordance with Missouri's Data Breach Notification Law (§407.1500, RSMo), in the event of a data breach that affects Missouri residents, I will notify affected users without unreasonable delay (not to exceed 60 days from discovery), provide detailed information about the breach including what data was affected, notify the Missouri Attorney General's office if the breach affects more than 1,000 Missouri residents, include specific information required by Missouri law in my notification, and provide guidance on steps users can take to protect themselves.</p>
        </section>

        <section>
          <h2>Changes to Privacy Policy</h2>
          <p>I will notify you of any changes to this privacy policy via email and/or in-app notifications. As a Missouri resident and individual developer, I will ensure all policy updates comply with Missouri privacy laws and regulations.</p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>If you have any questions about this Privacy Policy or would like to exercise your privacy rights under Missouri law, please contact me at: <a href="mailto:contact@nextt.app">contact@nextt.app</a>. As an individual developer, I strive to respond to all inquiries within a reasonable timeframe.</p>
          <p>For legal matters, you may also contact the Missouri Attorney General's Consumer Protection Division at 1-800-392-8222 or visit <a href="https://ago.mo.gov" target="_blank" rel="noopener noreferrer">ago.mo.gov</a> to file a complaint.</p>
        </section>
        </div>
      </div>
    </Layout>
  );
}

export default PrivacyPolicy;
