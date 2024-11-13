import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    if (location.pathname === '/') {
      // If we're already on home page, just scroll to the section
      const element = document.getElementById(path.replace('/#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we're on another page, navigate to home and then scroll
      navigate(path);
      setTimeout(() => {
        const element = document.getElementById(path.replace('/#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={logoStyle}>Orchard</h1>
        </Link>

        {/* Hamburger Menu Button */}
        <div style={hamburgerStyle} onClick={() => setIsOpen(!isOpen)}>
          <span style={hamburgerLineStyle}></span>
          <span style={hamburgerLineStyle}></span>
          <span style={hamburgerLineStyle}></span>
        </div>

        {/* Navigation Links */}
        <ul style={{
          ...navLinksStyle,
          ...(isOpen ? mobileNavLinksStyle : {})
        }}>
          {[
            { name: 'Home', path: '/#home' },
            { name: 'About', path: '/#about' },
            { name: 'Services', path: '/#services' },
            { name: 'Contact', path: '/#contact' }
          ].map((item) => (
            <li key={item.name}>
              <div
                onClick={() => handleNavigation(item.path)}
                style={{
                  ...linkStyle,
                  ...(isCurrentPage(item.path) ? activeLinkStyle : {}),
                  ...(item.name === 'Contact' ? contactButtonStyle : {}),
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = item.name === 'Contact' 
                    ? '#446e07' 
                    : 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isCurrentPage(item.path) 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : item.name === 'Contact' 
                      ? '#ffffff' 
                      : 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const navStyle = {
  backgroundColor: '#528508',
  color: '#ffffff',
  padding: '1rem 0',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
  position: 'relative',
};

const logoStyle = {
  fontSize: '1.75rem',
  fontWeight: 'bold',
  margin: 0,
  color: '#ffffff'
};

const hamburgerStyle = {
  display: 'none',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: '2rem',
  height: '2rem',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '0',
  zIndex: '10',
  '@media (max-width: 768px)': {
    display: 'flex',
  }
};

const hamburgerLineStyle = {
  width: '2rem',
  height: '0.25rem',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  transition: 'all 0.3s linear',
  position: 'relative',
  transformOrigin: '1px',
};

const navLinksStyle = {
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  gap: '2rem',
};

const mobileNavLinksStyle = {
  position: 'absolute',
  right: 0,
  top: '100%',
  backgroundColor: '#528508',
  width: '100%',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const linkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  display: 'block',
  fontSize: '0.95rem'
};

const activeLinkStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  fontWeight: 'bold',
};

const contactButtonStyle = {
  backgroundColor: '#ffffff',
  color: '#528508',
  padding: '8px 16px',
  borderRadius: '20px',
  fontWeight: 'bold',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  fontSize: '0.95rem'
};

const styles = `
  @media (max-width: 768px) {
    .hamburger {
      display: flex !important;
    }
    
    .nav-links {
      display: none;
    }
    
    .nav-links.open {
      display: flex;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Navbar;