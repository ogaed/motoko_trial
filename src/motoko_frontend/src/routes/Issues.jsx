import React, { useState, useEffect } from 'react';
import { motoko_backend } from '../../../declarations/motoko_backend';
import sharedStyles from '../styles/sharedStyles';
import { useAuth } from '../context/AuthContext';

const Issues = () => {
  const { user } = useAuth();
  
  const canEdit = user.role === 'farmer' || user.role === 'farm_specialist';
  const canAdd = user.role === 'farmer';
  const canDelete = user.role === 'farmer';

  const [crops, setCrops] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCropData, setNewCropData] = useState({
    description: '',
    issue_type: '',
    status: '',
    crop_id: '',
    farm_specialist_id: '',
    user_id: ''
  });

  const { inputStyle, buttonStyle, popupStyle, overlayStyle, tableStyle } = sharedStyles;

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const cropsData = await motoko_backend.getIssues();
      setCrops(cropsData);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCropData({
      ...newCropData,
      [name]: value
    });
  };

  const addCrop = async () => {
    try {
      await motoko_backend.addIssue(newCropData);
      setShowPopup(false);
      setNewCropData({
        description: '',
    issue_type: '',
    status: '',
    crop_id: '',
    farm_specialist_id: '',
    user_id: ''
      });
      fetchCrops();
      alert('Successful')
      console.log('Crop added successfully');
    } catch (error) {
      console.error('Error adding crop:', error);
    }
  };

  return (
    <div style={{ 
      background: '#ffffff', 
      minHeight: '65vh',  // Reduced from 100vh
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: '10px',
      padding: '-5rem' // Added padding to maintain some spacing
    }}>  <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '800px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Issue List</h2>
        {canAdd && <button onClick={() => setShowPopup(true)} style={buttonStyle}>Add Issue</button>}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Issue ID </th>
              <th>Description</th>
              <th>Issue type</th>
              <th>Issue ID </th>
              {/* Add other table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop[0]}>
                <td>{crop[0]}</td>
                <td>{crop[1].description}</td>
                <td>{crop[1].issue_type}</td>
                {/* Add other table data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <>
            <div style={overlayStyle} onClick={() => setShowPopup(false)} />
            <div style={popupStyle}>
              <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Add Issue</h2>
              <input type="text" name="description" value={newCropData.description} onChange={handleInputChange} placeholder="Description" style={inputStyle} />
              <input type="text" name="issue_type" value={newCropData.issue_type} onChange={handleInputChange} placeholder="Issue type" style={inputStyle} />
              <input type="text" name="status" value={newCropData.status} onChange={handleInputChange} placeholder="Status" style={inputStyle} />
              <input type="text" name="crop_id" value={newCropData.crop_id} onChange={handleInputChange} placeholder="Crop Id" style={inputStyle} />
              <input type="text" name="farm_specialist_id" value={newCropData.farm_specialist_id} onChange={handleInputChange} placeholder="Farm Specialist" style={inputStyle} />
             <input type="text" name="user_id" value={newCropData.user_id} onChange={handleInputChange} placeholder="User ID" style={inputStyle} />
              {canAdd && <button onClick={addCrop} style={buttonStyle}>Add Issue</button>}
              <button onClick={() => setShowPopup(false)} style={{ ...buttonStyle, backgroundColor: 'red', marginTop: '10px' }}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Issues;
