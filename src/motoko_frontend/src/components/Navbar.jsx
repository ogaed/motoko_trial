import React from 'react';

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <h1 style={logoStyle}>Orchard</h1>
        <ul style={navLinksStyle}>
          <li style={linkStyle}>Home</li>
          <li style={linkStyle}>About</li>
          <li style={linkStyle}>Services</li>
          <li style={linkStyle}>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

// Styles
const navStyle = {
  backgroundColor: '#528508ff', // Your main color
  color: '#ffffff',
  padding: '10px 0',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
};

const logoStyle = {
  fontSize: '1.5rem',
};

const navLinksStyle = {
  listStyle: 'none',
  display: 'flex',
};

const linkStyle = {
  margin: '0 10px',
  cursor: 'pointer',
};

export default Navbar;
