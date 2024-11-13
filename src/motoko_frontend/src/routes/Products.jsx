import React, { useState, useEffect } from 'react';
import { motoko_backend } from '../../../declarations/motoko_backend';
import sharedStyles from '../styles/sharedStyles';
import { useAuth } from '../context/AuthContext';

const Products = () => {
  const { user } = useAuth();
  
  const canEdit = user.role === 'farmer';
  const canAdd = user.role === 'farmer';
  const canDelete = user.role === 'farmer';
  const canAddToCart = user.role === 'customer';
  const [products, setCrops] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCropData, setNewCropData] = useState({
    cropId: '',
    pName: '',
    price: '',
    quantity: '',
    user_id: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleEdit = (productId) => {
    const product = products.find(p => p[0] === productId);
    if (product) {
      setEditingProduct({
        cropId: product[1].cropId,
        pName: product[1].pName,
        price: product[1].price,
        quantity: product[1].quantity,
        user_id: product[1].user_id
      });
      setEditMode(true);
    }
  };

  const updateProduct = async () => {
    try {
      await motoko_backend.updateProduct({
        productId: editingProduct.productId,
        ...editingProduct
      });
      setEditMode(false);
      setEditingProduct(null);
      fetchCrops();
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const { inputStyle, buttonStyle, popupStyle, overlayStyle, tableStyle } = sharedStyles;

  return (
    <div style={{ 
      background: '#ffffff', 
      minHeight: '65vh',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: '10px',
      padding: '-5rem'
    }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '800px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Products List</h2>
        {canAdd && (
          <button onClick={() => setShowPopup(true)} style={buttonStyle}>Add Product</button>
        )}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              {(canEdit || canDelete || canAddToCart) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product[0]}>
                <td>{product[0]}</td>
                <td>{product[1].pName}</td>
                <td>{product[1].price}</td>
                <td>{product[1].quantity}</td>
                <td>
                  {canEdit && (
                    <button onClick={() => handleEdit(product[0])} style={{ ...buttonStyle, marginRight: '5px' }}>
                      Edit
                    </button>
                  )}
                  {canDelete && (
                    <button onClick={() => handleDelete(product[0])} style={{ ...buttonStyle, backgroundColor: 'red' }}>
                      Delete
                    </button>
                  )}
                  {canAddToCart && (
                    <button onClick={() => handleAddToCart(product[0])} style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}>
                      Add to Cart
                    </button>
                  )}
                </td>
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
        {editMode && editingProduct && (
          <>
            <div style={overlayStyle} onClick={() => setEditMode(false)} />
            <div style={popupStyle}>
              <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Edit Product</h2>
              <input 
                type="text" 
                name="cropId" 
                value={editingProduct.cropId} 
                onChange={(e) => setEditingProduct({...editingProduct, cropId: e.target.value})} 
                placeholder="Crop Id" 
                style={inputStyle} 
              />
              <input 
                type="text" 
                name="pName" 
                value={editingProduct.pName} 
                onChange={(e) => setEditingProduct({...editingProduct, pName: e.target.value})} 
                placeholder="Product Name" 
                style={inputStyle} 
              />
              <input 
                type="text" 
                name="price" 
                value={editingProduct.price} 
                onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} 
                placeholder="Price" 
                style={inputStyle} 
              />
              <input 
                type="text" 
                name="quantity" 
                value={editingProduct.quantity} 
                onChange={(e) => setEditingProduct({...editingProduct, quantity: e.target.value})} 
                placeholder="Quantity" 
                style={inputStyle} 
              />
              <input 
                type="text" 
                name="user_id" 
                value={editingProduct.user_id} 
                onChange={(e) => setEditingProduct({...editingProduct, user_id: e.target.value})} 
                placeholder="User ID" 
                style={inputStyle} 
              />
              <button onClick={updateProduct} style={buttonStyle}>Update Product</button>
              <button 
                onClick={() => {
                  setEditMode(false);
                  setEditingProduct(null);
                }} 
                style={{ ...buttonStyle, backgroundColor: 'red', marginTop: '10px' }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
