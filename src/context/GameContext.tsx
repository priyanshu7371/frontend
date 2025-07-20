import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface Item {
  id: string;
  name: string;
  icon: string;
  price: number;
  quantity: number;
  type: 'weapon' | 'armor' | 'consumable' | 'misc';
}

export interface Character {
  name: string;
  avatar: string;
  equipped: { [slot: string]: Item | null };
  stats: { [key: string]: number };
  exp: number;
  level: number;
  expMax: number;
}

interface GameContextType {
  inventory: Item[];
  shop: Item[];
  gold: number;
  character: Character;
  buyItem: (itemId: string) => void;
  equipItem: (itemId: string) => void;
  useItem: (itemId: string) => void;
  addCoins: (amount: number) => void;
  gainExp: (amount: number, onLevelUp?: () => void) => void;
  setCharacterName: (name: string) => void;
}

const defaultItems: Item[] = [
  { id: 'sword', name: 'Sword', icon: '🗡️', price: 100, quantity: 0, type: 'weapon' },
  { id: 'potion', name: 'Potion', icon: '🧪', price: 30, quantity: 0, type: 'consumable' },
  { id: 'shield', name: 'Shield', icon: '🛡️', price: 80, quantity: 0, type: 'armor' },
  { id: 'ring', name: 'Ring', icon: '💍', price: 120, quantity: 0, type: 'misc' },
];

const defaultShop: Item[] = defaultItems.map(item => ({ ...item, quantity: 1 }));

const defaultInventory: Item[] = [
  { id: 'sword', name: 'Sword', icon: '🗡️', price: 100, quantity: 1, type: 'weapon' },
  { id: 'potion', name: 'Potion', icon: '🧪', price: 30, quantity: 2, type: 'consumable' },
  { id: 'shield', name: 'Shield', icon: '🛡️', price: 80, quantity: 1, type: 'armor' },
];

const defaultCharacter: Character = {
  name: 'PlayerName',
  avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=User',
  equipped: { weapon: null, armor: null, misc: null },
  stats: { strength: 10, defense: 8, agility: 7 },
  exp: 0,
  level: 1,
  expMax: 500,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<Item[]>(defaultInventory);
  const [shop] = useState<Item[]>(defaultShop);
  const [gold, setGold] = useState<number>(0);
  // Load exp from localStorage if present
  const localExp = typeof window !== 'undefined' ? Number(localStorage.getItem('user_exp')) : 0;
  const [character, setCharacter] = useState<Character>({
    ...defaultCharacter,
    exp: localExp > 0 ? localExp : defaultCharacter.exp,
  });

  // Persist exp to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_exp', String(character.exp));
    }
  }, [character.exp]);

  const buyItem = (itemId: string) => {
    const item = shop.find(i => i.id === itemId);
    if (!item || gold < item.price) return;
    setGold(g => g - item.price);
    setInventory(inv => {
      const idx = inv.findIndex(i => i.id === itemId);
      if (idx !== -1) {
        const updated = [...inv];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return updated;
      } else {
        return [...inv, { ...item, quantity: 1 }];
      }
    });
  };

  const equipItem = (itemId: string) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;
    setCharacter(char => ({
      ...char,
      equipped: { ...char.equipped, [item.type]: item },
    }));
  };

  const useItem = (itemId: string) => {
    setInventory(inv =>
      inv.map(i =>
        i.id === itemId && i.quantity > 0
          ? { ...i, quantity: i.quantity - 1 }
          : i
      ).filter(i => i.quantity > 0)
    );
  };

  const addCoins = (amount: number) => {
    setGold(g => g + amount);
  };

  const gainExp = (amount: number, onLevelUp?: () => void) => {
    setCharacter(char => {
      let newExp = char.exp + amount;
      let newLevel = char.level;
      let newExpMax = char.expMax;
      let leveledUp = false;
      while (newExp >= newExpMax) {
        newExp -= newExpMax;
        newLevel += 1;
        newExpMax += 100;
        leveledUp = true;
      }
      if (leveledUp && onLevelUp) onLevelUp();
      return { ...char, exp: newExp, level: newLevel, expMax: newExpMax };
    });
  };

  const setCharacterName = (name: string) => {
    // Sanitize: remove HTML tags and trim whitespace
    const sanitized = name.replace(/<[^>]*>?/gm, '').trim().slice(0, 18);
    setCharacter(char => ({ ...char, name: sanitized || 'Player' }));
  };

  return (
    <GameContext.Provider value={{ inventory, shop, gold, character, buyItem, equipItem, useItem, addCoins, gainExp, setCharacterName }}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
}; 

export { GameProvider, useGame }; 