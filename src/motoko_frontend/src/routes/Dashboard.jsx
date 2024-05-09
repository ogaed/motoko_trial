import React from 'react';
import Crops from './Crops';
import Products from './Products';
import Issues from './Issues';
import Cart from './Cart';

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#528508ff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '800px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Dashboard</h2>
        {/* Include sections for crops, products, issues, and cart */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#528508ff', marginBottom: '10px' }}>Crops</h3>
          <Crops />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#528508ff', marginBottom: '10px' }}>Products</h3>
          <Products />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#528508ff', marginBottom: '10px' }}>Issues</h3>
          <Issues />
        </div>
        <div>
          <h3 style={{ color: '#528508ff', marginBottom: '10px' }}>Cart</h3>
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
