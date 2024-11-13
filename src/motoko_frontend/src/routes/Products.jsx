import React, { useState, useEffect } from 'react';
import { motoko_backend } from '../../../declarations/motoko_backend';
import sharedStyles from '../styles/sharedStyles';

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
    // Convert quantity to a string
    const newValue = name === 'quantity' ? value.toString() : value;
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
        <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Products List</h2>
        <button onClick={() => setShowPopup(true)} style={buttonStyle}>Add Product</button>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              {/* Add other table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product[0]}>
                <td>{product[0]}</td>
                <td>{product[1].pName}</td>
                <td>{product[1].price}</td>
                <td>{product[1].quantity}</td>
                {/* Add other table data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <>
            <div style={overlayStyle} onClick={() => setShowPopup(false)} />
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
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
