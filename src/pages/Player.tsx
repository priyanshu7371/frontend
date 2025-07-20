import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const icons = {
  profile: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8faeea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-7 8-7s8 3 8 7" /></svg>
  ),
  inventory: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8faeea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
  ),
  achievements: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e6c96a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.5 21 12 17.8 5.5 21 7 14.1 2 9.3 9 8.5 12 2" /></svg>
  ),
  statistics: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8faeea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="8" /><rect x="9" y="8" width="4" height="12" /><rect x="15" y="4" width="4" height="16" /></svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8faeea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
};

const navLinks = [
  { to: '/player', label: 'Profile', icon: icons.profile },
  { to: '/player/inventory', label: 'Inventory', icon: icons.inventory },
  { to: '/player/achievements', label: 'Achievements', icon: icons.achievements },
  { to: '/player/statistics', label: 'Statistics', icon: icons.statistics },
  { to: '/player/settings', label: 'Settings', icon: icons.settings },
];

const Player: React.FC = () => {
  const location = useLocation();
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'radial-gradient(ellipse at 60% 20%, #232a3a 0%, #181e2a 100%)', color: '#eaf0ff', fontFamily: '"Segoe UI", "Noto Sans JP", "Inter", Arial, sans-serif' }}>
      {/* Sidebar */}
      <nav style={{
        width: 90,
        background: 'rgba(24,28,40,0.97)',
        borderRight: '1.5px solid #3a4660',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 0',
        gap: 18,
        minHeight: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 10,
        boxShadow: '2px 0 12px #4f8cff11',
      }}>
        {navLinks.map(link => (
          <NavLink
            key={link.label}
            to={link.to}
            end={link.to === '/player'}
            style={({ isActive }) => ({
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              color: isActive ? '#e6c96a' : '#8faeea', textDecoration: 'none', fontWeight: 700, fontSize: 12,
              opacity: 1,
              background: isActive ? 'rgba(230,201,106,0.08)' : 'none',
              borderRadius: 8,
              padding: '8px 0',
              width: 60,
              transition: 'color 0.18s, background 0.18s',
            })}
          >
            {link.icon}
            <span style={{ fontSize: 10, marginTop: 1 }}>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: 90, minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '0', background: 'none', position: 'relative' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Player; 