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
          <footer style={{ textAlign: 'center', fontSize: 13, color: '#b4bcd0', padding: '12px 0 8px 0', letterSpacing: 0.2, background: 'none', userSelect: 'none' }}>
            created with love <span role="img" aria-label="love">❤️</span> by Priyanshu
          </footer>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
