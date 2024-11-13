import React, { useState } from 'react';
import { motoko_backend } from '../../../declarations/motoko_backend';

const Home = () => {
  const getStarted = () => {
    window.location.href = '/register';
  };

  return (
    <div style={containerStyle}>
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
            {/* Image section can be added here */}
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
  width: '50%'
};

const contentWrapperStyle = {
  height: '100%',
  paddingTop: '96px',
  paddingBottom: '56px'
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
  
export default Home;
