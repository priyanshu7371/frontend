import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './pages/Game';
import Profile from './pages/Profile';
import Inventory from './pages/Inventory';
import Achievements from './pages/Achievements';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Shop from './pages/Shop';
import ShopStorefront from './pages/ShopStorefront';
import ShopPurchases from './pages/ShopPurchases';
import ShopFeatured from './pages/ShopFeatured';
import ShopRedeem from './pages/ShopRedeem';
import ShopSettings from './pages/ShopSettings';
import Player from './pages/Player';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Game />} />
              <Route path="/player/*" element={<Player />}>
                <Route index element={<Profile />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="achievements" element={<Achievements />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/shop/*" element={<Shop />}>
                <Route index element={<ShopStorefront />} />
                <Route path="purchases" element={<ShopPurchases />} />
                <Route path="featured" element={<ShopFeatured />} />
                <Route path="redeem" element={<ShopRedeem />} />
                <Route path="settings" element={<ShopSettings />} />
              </Route>
            </Routes>
          </div>
          {/* Overlay floating text, not a full section */}
          <div style={{
            position: 'fixed',
            left: '50%',
            bottom: 20,
            transform: 'translateX(-50%)',
            background: 'rgba(32,38,60,0.82)',
            color: '#fff',
            fontSize: 15,
            fontFamily: 'Inter, Arial, sans-serif',
            padding: '6px 18px',
            borderRadius: 18,
            boxShadow: '0 2px 12px #4f8cff22',
            letterSpacing: 0.2,
            zIndex: 9999,
            userSelect: 'none',
            pointerEvents: 'none',
            opacity: 0.92
          }}>
            created with <span role="img" aria-label="love">❤️</span> by Priyanshu
          </div>
        </div>
        {/* Google Fonts for groovy font */}
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      </Router>
    </GameProvider>
  );
}

export default App;
