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
        <Crops />
        <Products />
        <Issues />
        <Cart />
      </div>
    </div>
  );
};

export default Dashboard;
