
import React, { useState, useEffect } from 'react';
import { motoko_backend } from '../../../declarations/motoko_backend';

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCropData, setNewCropData] = useState({
    crop_name: '',
    crop_age: '',
    acreage: '',
    trees_0_to_3: '',
    trees_4_to_7: '',
    trees_7_plus: '',
    farm_plot_no: '',
    variety: '',
    user_id: ''
  });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const cropsData = await motoko_backend.getCrops();
      setCrops(cropsData);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewCropData({
//       ...newCropData,
//       [name]: value
//     });
//   };

const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Convert value to a number using parseInt
    const numericValue = parseInt(value, 10);
    // Check if numericValue is NaN, if so, set it to an empty string
    const sanitizedValue = isNaN(numericValue) ? '' : numericValue.toString();
    setNewCropData({
      ...newCropData,
      [name]: sanitizedValue
    });
  };
  
  

  const addCrop = async () => {
    try {
      await motoko_backend.addCrop(newCropData);
      setShowPopup(false);
      setNewCropData({
        crop_name: '',
        crop_age: '',
        acreage: '',
        trees_0_to_3: '',
        trees_4_to_7: '',
        trees_7_plus: '',
        farm_plot_no: '',
        variety: '',
        user_id: ''
      });
      fetchCrops();
      alert('succesful')
      console.log('Crop added successfully');
    } catch (error) {
      console.error('Error adding crop:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#528508ff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '800px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Crops List</h2>
        <button onClick={() => setShowPopup(true)} style={buttonStyle}>Add Crop</button>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Crop ID</th>
              <th>Crop Name</th>
              {/* Add other table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop[0]}>
                <td>{crop[0]}</td>
                <td>{crop[1].crop_name}</td>
                {/* Add other table data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <div style={popupStyle}>
            <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Add Crop</h2>
            <input type="text" name="crop_name" value={newCropData.crop_name} onChange={handleInputChange} placeholder="Crop Name" style={inputStyle} />
            <input type="text" name="crop_age" value={newCropData.crop_age} onChange={handleInputChange} placeholder="Crop Age" style={inputStyle} />
            <input type="text" name="acreage" value={newCropData.acreage} onChange={handleInputChange} placeholder="Acreage" style={inputStyle} />
            <input type="text" name="trees_0_to_3" value={newCropData.trees_0_to_3} onChange={handleInputChange} placeholder="Trees 0-3 Years" style={inputStyle} />
            <input type="text" name="trees_4_to_7" value={newCropData.trees_4_to_7} onChange={handleInputChange} placeholder="Trees 4-7 Years" style={inputStyle} />
            <input type="text" name="trees_7_plus" value={newCropData.trees_7_plus} onChange={handleInputChange} placeholder="Trees 7+ Years" style={inputStyle} />
            <input type="text" name="farm_plot_no" value={newCropData.farm_plot_no} onChange={handleInputChange} placeholder="Farm Plot No" style={inputStyle} />
            <input type="text" name="variety" value={newCropData.variety} onChange={handleInputChange} placeholder="Variety" style={inputStyle} />
            <input type="text" name="user_id" value={newCropData.user_id} onChange={handleInputChange} placeholder="User ID" style={inputStyle} />
            <button onClick={addCrop} style={buttonStyle}>Add Crop</button>
            <button onClick={() => setShowPopup(false)} style={{ ...buttonStyle, backgroundColor: 'red', marginTop: '10px' }}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

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

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '600px',
  width: '100%',
  zIndex: '9999'
};

export default Crops;
