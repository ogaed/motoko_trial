import React, { useState } from 'react';
import { motoko_backend } from '../../../declarations/motoko_backend';

const Home = () => {
  const getStarted = () => {
    window.location.href = '/register';
  };

  return (
    <div id='home' style={containerStyle}>
      <section style={sectionStyle}>
        <div style={gridContainerStyle}>
          <div style={leftColumnStyle}>
            <div style={contentWrapperStyle}>
              <div style={textContentStyle}>
                <h1 style={headingStyle}>Welcome to Orchard</h1>
                <p style={mainParaStyle}>
                  Connect with local farmers, discover fresh produce, and support sustainable agriculture in your community.
                </p>
                <p style={subParaStyle}>
                  Orchard brings together farmers and consumers, making it easier than ever to access locally grown food and build meaningful relationships with the people who grow your food.
                </p>
              </div>

              <div style={featuresSectionStyle}>
                <h3 style={featuresHeadingStyle}>Features</h3>
                <ul style={featureListStyle}>
                  <li style={featureItemStyle}>✓ Direct farmer-to-consumer connections</li>
                  <li style={featureItemStyle}>✓ Fresh, local produce marketplace</li>
                  <li style={featureItemStyle}>✓ Sustainable farming practices</li>
                </ul>
                <button onClick={getStarted} style={buttonStyle}>Get Started</button>
              </div>
            </div>
          </div>

          <div style={rightColumnStyle}>
            <div style={photoContainer}>
              <img src="photo1.jpg" alt="Background Photo" style={img1} />
              <img src="photo2.jpg" alt="Foreground Photo" style={img2} />
            </div>
          </div>
        </div>
      </section>

      <section style={aboutSectionStyle} id="about">
        <h2 style={sectionHeadingStyle}>About Us</h2>
        <p style={sectionTextStyle}>
          Orchard was founded with a vision to revolutionize the way local communities access fresh, sustainable produce. 
          Our platform serves as a bridge between passionate farmers and conscious consumers, fostering a sustainable and 
          transparent food ecosystem.
        </p>
      </section>

      <section style={servicesSectionStyle} id="services">
        <h2 style={sectionHeadingStyle}>Our Services</h2>
        <div style={servicesGridStyle}>
          <div style={serviceCardStyle}>
            <h3 style={serviceCardHeadingStyle}>Marketplace</h3>
            <p style={serviceCardTextStyle}>Browse and purchase fresh, local produce directly from farmers</p>
          </div>
          <div style={serviceCardStyle}>
            <h3 style={serviceCardHeadingStyle}>Farmer Connect</h3>
            <p style={serviceCardTextStyle}>Connect and build relationships with local farmers</p>
          </div>
          <div style={serviceCardStyle}>
            <h3 style={serviceCardHeadingStyle}>Education</h3>
            <p style={serviceCardTextStyle}>Learn about sustainable farming practices and seasonal produce</p>
          </div>
        </div>
      </section>

      <section style={contactSectionStyle} id="contact">
        <h2 style={sectionHeadingStyle}>Contact Us</h2>
        <div style={contactContentStyle}>
          <p style={contactTextStyle}>
            Have questions or feedback? We'd love to hear from you!
          </p>
          <div style={contactInfoStyle}>
            <p>Email: contact@orchard.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Farm Street, Agricultural District</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const containerStyle = {
  background: 'linear-gradient(to bottom, #e8f5e9, #c8e6c9)',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative'
};

const sectionStyle = {
  overflow: 'hidden',
  width: '100%'
};

const gridContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  padding: '0 24px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const leftColumnStyle = {
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  paddingRight: '40px'
};

const contentWrapperStyle = {
  height: '100%',
  paddingTop: '96px',
};

const textContentStyle = {
  marginBottom: '40px'
};

const headingStyle = {
  fontSize: '48px',
  fontWeight: 'bold',
  color: '#528508ff',
  marginBottom: '24px'
};

const mainParaStyle = {
  fontSize: '20px',
  color: '#333',
  marginBottom: '16px',
  lineHeight: '1.5'
};

const subParaStyle = {
  fontSize: '18px',
  color: '#666',
  lineHeight: '1.5'
};

const featuresSectionStyle = {
  width: '100%',
  maxWidth: '500px'
};

const featuresHeadingStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#528508ff',
  marginBottom: '16px'
};

const featureListStyle = {
  listStyle: 'none',
  padding: 0,
  marginBottom: '32px'
};

const featureItemStyle = {
  marginBottom: '12px',
  color: '#444',
  fontSize: '16px'
};

const buttonStyle = {
  backgroundColor: '#528508ff',
  color: '#ffffff',
  padding: '16px',
  width: '100%',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: '600',
  transition: 'background-color 0.3s ease'
};

const rightColumnStyle = {
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  padding: '16px'
};

const sectionHeadingStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#528508ff',
  marginBottom: '24px',
  textAlign: 'center'
};

const aboutSectionStyle = {
  padding: '80px 24px',
  maxWidth: '1200px',
  margin: '0 auto',
  textAlign: 'center'
};

const sectionTextStyle = {
  fontSize: '18px',
  color: '#444',
  lineHeight: '1.6',
  maxWidth: '800px',
  margin: '0 auto'
};

const servicesSectionStyle = {
  padding: '80px 24px',
  background: 'rgba(255, 255, 255, 0.7)',
  maxWidth: '1200px',
  margin: '0 auto'
};

const servicesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  marginTop: '40px',
  width: '100%'
};

const serviceCardStyle = {
  padding: '24px',
  background: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

const serviceCardHeadingStyle = {
  fontSize: '24px',
  color: '#528508ff',
  marginBottom: '16px'
};

const serviceCardTextStyle = {
  fontSize: '16px',
  color: '#666',
  lineHeight: '1.5'
};

const contactSectionStyle = {
  padding: '80px 24px',
  maxWidth: '1200px',
  margin: '0 auto',
  textAlign: 'center'
};

const contactContentStyle = {
  maxWidth: '600px',
  margin: '0 auto'
};

const contactTextStyle = {
  fontSize: '20px',
  color: '#444',
  marginBottom: '32px'
};

const contactInfoStyle = {
  fontSize: '18px',
  color: '#666',
  lineHeight: '1.8'
};

const photoContainer = {
  position: "relative",
  width: "500px",
  height: "500px"
};

const img1 = {
  position: "absolute",
  width: "80%",
  border: "5px solid white",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  top: 0,
  left: 0,
  zIndex: 1,
  transform: "rotate(-5deg)"
};
const img2 = {
  position: "absolute",
  width: "80%",
  border: "5px solid white",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  top: "20px",
  left: "30px",
  zIndex: 2,
  transform: "rotate(5deg)"
}

  
export default Home;