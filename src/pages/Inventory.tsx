import React from 'react';
import { useGame } from '../context/GameContext';

const Inventory: React.FC = () => {
  const { inventory, useItem } = useGame();

  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '32px auto', background: 'rgba(32,38,60,0.93)', borderRadius: 14, boxShadow: '0 2px 12px #4f8cff11', padding: 24, border: '1.5px solid #3a4660' }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: '#8faeea', marginBottom: 12 }}>Inventory</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 16 }}>
        {inventory.length === 0 && <div style={{ color: '#b4bcd0', gridColumn: 'span 4', textAlign: 'center', fontSize: 16, padding: 16 }}><span style={{ fontSize: 24 }}>📦</span><br />No items yet.</div>}
        {inventory.map((item) => (
          <div key={item.id} style={{
            background: 'linear-gradient(120deg, #181e2a 70%, #232a3a 100%)',
            border: '1.5px solid #4f8cff',
            borderRadius: 8,
            width: 80,
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#eaf0ff',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: '0 1px 4px #232a3a33',
            cursor: 'pointer',
            transition: 'transform 0.1s, box-shadow 0.2s',
            position: 'relative',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 10px #7faaff77, 0 1px 4px #232a3a33'; e.currentTarget.style.transform = 'scale(1.03)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px #232a3a33'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <span style={{ fontSize: 22, marginBottom: 2 }}>{item.icon}</span>
            <span style={{ fontSize: 11, color: '#b4bcd0', fontWeight: 500 }}>{item.name}</span>
            <span style={{ position: 'absolute', top: 6, right: 10, fontSize: 10, color: '#7faaff', fontWeight: 700 }}>x{item.quantity}</span>
            {item.type === 'consumable' && <button style={{ marginTop: 6, fontSize: 10, background: '#232a3a', color: '#7faaff', border: '1px solid #4f8cff', borderRadius: 7, padding: '2px 8px', cursor: 'pointer' }} onClick={() => useItem(item.id)}>Use</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory; 