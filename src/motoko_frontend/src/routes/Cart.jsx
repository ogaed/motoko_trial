import React, { useState, useEffect } from 'react';
import { motoko_backend } from '../../../declarations/motoko_backend';

const Cart = () => {
  const [crops, setCrops] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCropData, setNewCropData] = useState({
    quantity: '',
    unitprice: '',
    total: '',
    status: '',
    product_id: '',
    user_id: ''
  });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const cropsData = await motoko_backend.getCarts();
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
      await motoko_backend.addCart(newCropData);
      setShowPopup(false);
      setNewCropData({
        quantity: '',
    unitprice: '',
    total: '',
    status: '',
    product_id: '',
    user_id: ''
      });
      fetchCrops();
      alert('Successful');
      console.log('Crop added successfully');
    } catch (error) {
      console.error('Error adding crop:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#528508ff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '800px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Cart List</h2>
        <button onClick={() => setShowPopup(true)} style={buttonStyle}>Add Cart</button>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Cart ID</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
              {/* Add other table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop[0]}>
                <td>{crop[0]}</td>
                <td>{crop[1].quantity}</td>

                <td>{crop[1].total}</td>
                <td>{crop[1].status}</td>
                {/* Add other table data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <div style={popupStyle}>
            <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Add Cart</h2>
            <input type="text" name="quantity" value={newCropData.quantity} onChange={handleInputChange} placeholder="Quantity" style={inputStyle} />
            <input type="text" name="unitprice" value={newCropData.unitprice} onChange={handleInputChange} placeholder="Unit Price" style={inputStyle} />
            <input type="text" name="total" value={newCropData.total} onChange={handleInputChange} placeholder="Total" style={inputStyle} />
            <input type="text" name="status" value={newCropData.status} onChange={handleInputChange} placeholder="Status" style={inputStyle} />
            <input type="text" name="product_id" value={newCropData.product_id} onChange={handleInputChange} placeholder="Product Id" style={inputStyle} />
            <input type="text" name="user_id" value={newCropData.user_id} onChange={handleInputChange} placeholder="User ID" style={inputStyle} />
            <button onClick={addCrop} style={buttonStyle}>Add Cart</button>
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

export default Cart;
