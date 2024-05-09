import React, { useState } from 'react';
import { Principal } from '@dfinity/principal';
// import { Agent } from '@dfinity/agent';

const Login = () => {
  const [identity, setIdentity] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const agent = new Agent({
        identity: Principal.fromText(identity),
      });
      console.log('User authenticated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setIdentity('');
    // Perform logout actions if needed
  };

  const handleIdentityChange = (event) => {
    setIdentity(event.target.value);
  };

  return (
    <div style={containerStyle}>
      {identity ? (
        <div>
          <p style={textStyle}>Logged in as: {identity}</p>
          <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input type="text" value={identity} onChange={handleIdentityChange} placeholder="Enter Internet Identity" style={inputStyle} />
          <button style={buttonStyle} onClick={handleLogin}>Login</button>
        </div>
      )}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

// Styles
const containerStyle = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '400px',
  margin: '0 auto',
};

const inputStyle = {
  marginBottom: '10px',
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  backgroundColor: '#528508ff',
  color: '#ffffff',
  padding: '10px',
  width: '100%',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

const textStyle = {
  marginBottom: '10px',
};

const errorStyle = {
  color: 'red',
};

export default Login;
