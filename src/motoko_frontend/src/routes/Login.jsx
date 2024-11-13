import React, { useState } from 'react';
import { Principal } from '@dfinity/principal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identity, setIdentity] = useState('');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('customer');
  const [isTestMode, setIsTestMode] = useState(false);

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

  const handleTestLogin = async () => {
    try {
      console.log('Attempting test login with role:', selectedRole);
      const testIdentities = {
        farmer: 'test-farmer-identity',
        customer: 'test-customer-identity',
        farm_specialist: 'test-specialist-identity'
      };
      console.log('Using test identity:', testIdentities[selectedRole]);
      await login(selectedRole, testIdentities[selectedRole]);
      console.log('Login successful, navigating to dashboard');
      navigate('/dashboard');
    } catch (err) {
      console.error('Test login failed:', err);
      setError(err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2 style={{ color: '#528508ff', marginBottom: '20px' }}>Login</h2>
        
        {!isTestMode ? (
          <>
            <input 
              type="text" 
              value={identity} 
              onChange={(e) => setIdentity(e.target.value)} 
              placeholder="Enter Internet Identity" 
              style={inputStyle} 
            />
            <button style={buttonStyle} onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              style={inputStyle}
            >
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
              <option value="farm_specialist">Farm Specialist</option>
            </select>
            <button style={buttonStyle} onClick={handleTestLogin}>
              Test Login as {selectedRole}
            </button>
          </>
        )}

        <div style={{ marginTop: '20px' }}>
          <button 
            style={{ ...buttonStyle, backgroundColor: '#666' }} 
            onClick={() => setIsTestMode(!isTestMode)}
          >
            Switch to {isTestMode ? 'Internet Identity' : 'Test Mode'}
          </button>
        </div>

        {error && <p style={errorStyle}>{error}</p>}
      </div>
    </div>
  );
};

const containerStyle = {
  background: 'linear-gradient(to bottom, #e8f5e9, #c8e6c9)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const inputStyle = {
  padding: '10px',
  margin: '10px 0',
  width: '200px',
  borderRadius: '5px',
  border: '1px solid #ddd'
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  backgroundColor: '#528508ff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const errorStyle = {
  color: 'red',
  marginTop: '10px'
};

export default Login;
