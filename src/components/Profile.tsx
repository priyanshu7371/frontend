import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { character, gold, setCharacterName } = useGame();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(character.name || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCharacterName(nameInput.trim() || 'Player');
    setEditing(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(36, 54, 90, 0.82)',
        border: '1.5px solid #4f8cff',
        borderRadius: 12,
        padding: '6px 14px',
        color: '#eaf6ff',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        fontWeight: 700,
        fontSize: 15,
        minHeight: 44,
        minWidth: 0,
        boxShadow: '0 2px 8px #4f8cff22',
        gap: 10,
        userSelect: 'none',
        cursor: 'default',
        transition: 'box-shadow 0.18s, border-color 0.18s',
        backdropFilter: 'blur(4px) brightness(1.05)',
      }}
    >
      {/* Avatar */}
      <span
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #232a3a 60%, #4f8cff 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          marginRight: 8,
          boxShadow: '0 0 6px #4f8cff33',
          border: '2px solid #4f8cff',
        }}>
        {character.avatar ? <img src={character.avatar} alt="Avatar" style={{ width: 28, height: 28, borderRadius: '50%' }} /> : '👤'}
      </span>
      {/* Name + Edit */}
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {editing ? (
          <form onSubmit={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label htmlFor="profile-name-input" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>Name</label>
            <input
              id="profile-name-input"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              style={{
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 6,
                border: '1px solid #4f8cff',
                padding: '2px 8px',
                background: '#232a3a',
                color: '#dbeafe',
                width: 80,
                outline: 'none',
              }}
              maxLength={18}
              autoFocus
            />
            <button type="submit" style={{
              background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 13, padding: '2px 8px', cursor: 'pointer', marginLeft: 2
            }}>Save</button>
          </form>
        ) : (
          <>
            <span style={{ fontWeight: 800, color: '#dbeafe', fontSize: 15, letterSpacing: 0.3 }}>{character.name || 'Player'}</span>
            <button
              onClick={() => { setEditing(true); setNameInput(character.name || ''); }}
              style={{ background: 'none', border: 'none', color: '#7faaff', cursor: 'pointer', fontSize: 15, marginLeft: 2, padding: 0 }}
              title="Edit Name"
              tabIndex={0}
            >
              ✏️
            </button>
          </>
        )}
      </span>
      {/* Coin/Gold Display */}
      <span style={{
        marginLeft: 8,
        background: 'rgba(255, 215, 0, 0.18)',
        borderRadius: 7,
        padding: '2px 10px',
        color: '#ffd700',
        fontWeight: 800,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        boxShadow: '0 0 4px #ffd70022',
        border: '1px solid #ffd70044',
      }}>
        <span style={{ fontSize: 16, marginRight: 2 }}>🪙</span> {gold}
      </span>
    </div>
  );
};

export default Profile; 