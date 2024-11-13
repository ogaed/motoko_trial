import React, { useState, useEffect } from 'react';
import { motoko_backend } from '../../../declarations/motoko_backend';
import sharedStyles from '../styles/sharedStyles';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { user } = useAuth();
  
  const canEdit = user.role === 'farmer' || user.role === 'customer';
  const canAdd = user.role === 'customer';
  const canDelete = user.role === 'farmer' || user.role === 'customer';

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

  const { inputStyle, buttonStyle, popupStyle, overlayStyle, tableStyle } = sharedStyles;

  return (
    <div style={{ 
      background: '#ffffff', 
      minHeight: '65vh',  // Reduced from 100vh
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: '10px',
      padding: '-5rem' // Added padding to maintain some spacing
    }}> <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '800px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Cart List</h2>
        {canAdd && (
          <button onClick={() => setShowPopup(true)} style={buttonStyle}>Add to Cart</button>
        )}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Cart ID</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
              {(canEdit || canDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop[0]}>
                <td>{crop[0]}</td>
                <td>{crop[1].quantity}</td>

                <td>{crop[1].total}</td>
                <td>{crop[1].status}</td>
                {(canEdit || canDelete) && (
                  <td>
                    {canEdit && (
                      <button onClick={() => handleEdit(crop[0])} style={{ ...buttonStyle, marginRight: '5px' }}>
                        Edit
                      </button>
                    )}
                    {canDelete && (
                      <button onClick={() => handleDelete(crop[0])} style={{ ...buttonStyle, backgroundColor: 'red' }}>
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <>
            <div style={overlayStyle} onClick={() => setShowPopup(false)} />
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
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
