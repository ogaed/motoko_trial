import React, { useState } from 'react';
import Crops from './Crops';
import Products from './Products';
import Issues from './Issues';
import Cart from './Cart';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('crops');

  const renderContent = () => {
    switch (activeTab) {
      case 'crops':
        return <Crops />;
      case 'products':
        return <Products />;
      case 'issues':
        return <Issues />;
      case 'cart':
        return <Cart />;
      default:
        return <Crops />;
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #e8f5e9, #c8e6c9)', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '20px', 
        borderRadius: '10px', 
        maxWidth: '1200px',
        margin: '0 auto',
        width: '90%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#528508ff', marginBottom: '20px' }}>Dashboard</h2>
        
        {/* Tab List */}
        <div style={tabListStyle}>
          {[
            { id: 'crops', label: 'Crops' },
            { id: 'products', label: 'Products' },
            { id: 'issues', label: 'Issues' },
            { id: 'cart', label: 'Cart' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...tabButtonStyle,
                ...(activeTab === tab.id ? activeTabStyle : {})
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ marginTop: '2rem' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const tabListStyle = {
  display: 'flex',
  gap: '1rem',
  borderBottom: '2px solid #e0e0e0',
  paddingBottom: '0.5rem',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%'
  }
};

const tabButtonStyle = {
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  color: '#666',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  width: '100%',
  textAlign: 'left',
  '@media (max-width: 768px)': {
    padding: '1rem',
    borderRadius: '4px'
  }
};

const activeTabStyle = {
  backgroundColor: '#528508',
  color: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default Dashboard;
