import { createContext, useState, useContext} from 'react';
import type { Buyers, Meat } from '../types';

interface GlobalContextType {
  meats: Meat[];
  setMeats: (meats: Meat[]) => void;
  buyers: Buyers[];
  setBuyers: (buyers: Buyers[]) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: any) {
  const [meats, setMeats] = useState<Meat[]>([]);
  const [buyers, setBuyers] = useState<Buyers[]>([]);
  const value = {
    meats,
    setMeats,
    buyers,
    setBuyers
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context;
}