import React, { useState } from 'react';
import { motoko_backend } from '../../../declarations/motoko_backend';

const Register = () => {
  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: '0', // Default role is customer
    location: '',
    phoneNumber: '',
    nationalId: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const AddUser = () => {
    const { email, firstName, lastName, role, location, phoneNumber, nationalId } = userData;
    motoko_backend.addUser({
      email,
      first_name: firstName,
      last_name: lastName,
      role: parseInt(role), 
      location,
      phone_number: phoneNumber,
      national_id: nationalId
    })
      .then(() => {
      alert('Welcome ')
        console.log('User added successfully');
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <div style={{ backgroundColor: '#528508ff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Add User</h2>
        <input type="text" name="email" value={userData.email} onChange={handleInputChange} placeholder="Email" style={inputStyle} />
        <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} placeholder="First Name" style={inputStyle} />
        <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} placeholder="Last Name" style={inputStyle} />
        <select name="role" value={userData.role} onChange={handleInputChange} style={inputStyle}>
          <option value="0">Customer</option>
          <option value="1">Farmer</option>
          <option value="2">Farm Specialist</option>
        </select>
        <input type="text" name="location" value={userData.location} onChange={handleInputChange} placeholder="Location" style={inputStyle} />
        <input type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" style={inputStyle} />
        <input type="text" name="nationalId" value={userData.nationalId} onChange={handleInputChange} placeholder="National ID" style={inputStyle} />
        <button onClick={AddUser} style={buttonStyle}>Add User</button>
      </div>
    </div>
  );
};

// Styles
const inputStyle = {
  marginBottom: '10px',
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
  borderRadius: '5px',
  border: '1px solid #528508ff'
};

const buttonStyle = {
  backgroundColor: '#528508ff',
  color: '#ffffff',
  padding: '10px',
  width: '100%',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer'
};

export default Register;
