import React, { useState, useEffect } from 'react';
import { motoko_backend } from '../../../declarations/motoko_backend';

const Products = () => {
  const [products, setCrops] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCropData, setNewCropData] = useState({
    cropId: '',
    pName: '',
    price: '',
    quantity: '',
    user_id: ''
  });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const cropsData = await motoko_backend.getProducts();
      setCrops(cropsData);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Convert quantity to a number if it's not empty
    const newValue = name === 'quantity' ? parseInt(value, 10) : value;
    setNewCropData({
      ...newCropData,
      [name]: newValue
    });
  };
  

  const addCrop = async () => {
    try {
      await motoko_backend.addProduct(newCropData);
      setShowPopup(false);
      setNewCropData({
        cropId: '',
        pName: '',
        price: '',
        quantity: '',
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
    <div style={{ backgroundColor: '#528508ff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '800px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Products List</h2>
        <button onClick={() => setShowPopup(true)} style={buttonStyle}>Add Product</button>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              {/* Add other table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product[0]}>
                <td>{product[0]}</td>
                <td>{product[1].pName}</td>
                {/* Add other table data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <div style={popupStyle}>
            <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Add Product</h2>
            <input type="text" name="cropId" value={newCropData.cropId} onChange={handleInputChange} placeholder="Crop Id" style={inputStyle} />
            <input type="text" name="pName" value={newCropData.pName} onChange={handleInputChange} placeholder="Product Name" style={inputStyle} />
            <input type="text" name="price" value={newCropData.price} onChange={handleInputChange} placeholder="Price" style={inputStyle} />
            <input type="text" name="quantity" value={newCropData.quantity} onChange={handleInputChange} placeholder="Quantity" style={inputStyle} />
             <input type="text" name="user_id" value={newCropData.user_id} onChange={handleInputChange} placeholder="User ID" style={inputStyle} />
            <button onClick={addCrop} style={buttonStyle}>Add Product</button>
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

export default Products;
