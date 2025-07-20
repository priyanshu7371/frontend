import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const icons = {
  storefront: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a7bfff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
  ),
  purchases: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e6c96a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
  ),
  featured: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b7aaff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.5 21 12 17.8 5.5 21 7 14.1 2 9.3 9 8.5 12 2" /></svg>
  ),
  redeem: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8faeea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2" /><path d="M12 7v10" /></svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8faeea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
};

const navLinks = [
  { to: '/shop', label: 'Storefront', icon: icons.storefront },
  { to: '/shop/purchases', label: 'My Purchases', icon: icons.purchases },
  { to: '/shop/featured', label: 'Featured', icon: icons.featured },
  { to: '/shop/redeem', label: 'Redeem', icon: icons.redeem },
  { to: '/shop/settings', label: 'Shop Settings', icon: icons.settings },
];

const Shop: React.FC = () => {
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
            end={link.to === '/shop'}
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

export default Shop; 