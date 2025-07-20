import React from 'react';
import { useGame } from '../context/GameContext';

const Level: React.FC = () => {
  const { character } = useGame();
  return (
    <span
      style={{
        background: 'linear-gradient(90deg, #4f8cff 60%, #a77fff 100%)',
        borderRadius: 8,
        padding: '3px 12px',
        fontWeight: 900,
        fontSize: 14,
        color: '#fff',
        marginLeft: 8,
        boxShadow: '0 0 8px #4f8cff55',
        border: '1.5px solid #232a3a',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <span style={{ fontSize: 16, marginRight: 4 }}>🏅</span>Lv. {character.level}
    </span>
  );
};

export default Level; 