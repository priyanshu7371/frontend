import React from 'react';
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
import Landing from './pages/Landing';
import Player from './pages/Player';
import { GameProvider } from './context/GameContext';

function RootRoute() {
  const entered = localStorage.getItem('enteredApp');
  if (entered === 'true') {
    return <Game />;
  } else {
    return <Landing />;
  }
}

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/landing" element={<Landing />} />
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
      </Router>
    </GameProvider>
  );
}

export default App;
