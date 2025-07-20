import React from 'react';

const ShopFeatured: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '32px auto', background: 'rgba(32,38,60,0.93)', borderRadius: 14, boxShadow: '0 2px 12px #4f8cff11', padding: 24, border: '1.5px solid #3a4660' }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: '#b7aaff', marginBottom: 12 }}>Featured</h2>
      {/* Featured content goes here */}
    </div>
  );
};

export default ShopFeatured; 