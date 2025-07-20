import React from 'react';
import { useGame } from '../context/GameContext';

const Profile: React.FC = () => {
  const { character, gold } = useGame();
  // You can add more profile details here
  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '32px auto', background: 'rgba(32,38,60,0.93)', borderRadius: 14, boxShadow: '0 2px 12px #4f8cff11', padding: 24, border: '1.5px solid #3a4660' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <img src={character.avatar} alt="Player Avatar" style={{ width: 56, height: 56, borderRadius: '50%' }} />
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{character.name}</h2>
          <div style={{ fontSize: 13, color: '#e6c96a', fontWeight: 700 }}>Lv. {character.level} &bull; {gold} Gold</div>
        </div>
      </div>
      {/* Add more profile info here */}
    </div>
  );
};

export default Profile; 