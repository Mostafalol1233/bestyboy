import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Voucher } from '@shared/schema';

// ====================================================================
// BESTY BOY GAMING - VOUCHER DATA - EDIT HERE TO CHANGE CARD VALUES
// ====================================================================

// Helper function to create voucher descriptions
const createDescription = (gameType: string, amount: number, bonus: number): string => {
  const amountK = (amount/1000).toFixed(0);
  const bonusK = (bonus/1000).toFixed(0);
  
  const currencyMap: Record<string, string> = {
    "crossfire": "zp",
    "pubg": "UC",
    "freefire": "Diamonds"
  };
  
  const currency = currencyMap[gameType] || "";
  return `${gameType} card ${amountK}k + ${bonusK}k ${currency} bonus`;
};

// ====================================================================
// DEFAULT VOUCHERS - USED IF NO SAVED DATA EXISTS
// ====================================================================
const defaultCrossfireVouchers = [
  {
    id: 1,
    gameType: "crossfire",
    amount: 5000,     // Amount in points
    bonus: 2500,      // Bonus points
    price: 120,       // Price in EGP
    currency: "ZP",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
  {
    id: 2,
    gameType: "crossfire",
    amount: 10000,
    bonus: 5000,
    price: 240,
    currency: "ZP",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
  {
    id: 3,
    gameType: "crossfire",
    amount: 20000,
    bonus: 10000,
    price: 455,
    currency: "ZP",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
  {
    id: 4,
    gameType: "crossfire",
    amount: 50000,
    bonus: 25000,
    price: 1120,
    currency: "ZP",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
  {
    id: 5,
    gameType: "crossfire",
    amount: 100000,
    bonus: 50000,
    price: 2300,
    currency: "ZP",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
];

const defaultPubgVouchers = [
  {
    id: 6,
    gameType: "pubg",
    amount: 5000,     // Amount in UC
    bonus: 2500,      // Bonus UC
    price: 120,       // Price in EGP
    currency: "UC",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
  {
    id: 7,
    gameType: "pubg",
    amount: 10000,
    bonus: 5000,
    price: 240,
    currency: "UC",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
  {
    id: 8,
    gameType: "pubg",
    amount: 50000,
    bonus: 25000,
    price: 1120,
    currency: "UC",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
];

const defaultFreeFireVouchers = [
  {
    id: 9,
    gameType: "freefire",
    amount: 5000,     // Amount in Diamonds
    bonus: 2500,      // Bonus Diamonds
    price: 120,       // Price in EGP
    currency: "Diamonds",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
  {
    id: 10,
    gameType: "freefire",
    amount: 10000,
    bonus: 5000,
    price: 240,
    currency: "Diamonds",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
  {
    id: 11,
    gameType: "freefire",
    amount: 50000,
    bonus: 25000,
    price: 1120,
    currency: "Diamonds",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
];

// Process vouchers to add descriptions
const processVouchers = (vouchers: any[]) => {
  return vouchers.map(voucher => ({
    ...voucher,
    description: createDescription(voucher.gameType, voucher.amount, voucher.bonus),
  }));
};

// Combine all default vouchers into a single array
const getDefaultVouchers = () => {
  const processedCrossfireVouchers = processVouchers(defaultCrossfireVouchers);
  const processedPubgVouchers = processVouchers(defaultPubgVouchers);
  const processedFreeFireVouchers = processVouchers(defaultFreeFireVouchers);
  
  return [
    ...processedCrossfireVouchers,
    ...processedPubgVouchers,
    ...processedFreeFireVouchers
  ];
};

// ====================================================================
// React Context Setup with Edit Functionality
// ====================================================================

interface VoucherContextType {
  vouchers: Voucher[];
  getVouchersByGameType: (gameType: string) => Voucher[];
  updateVoucher: (id: number, updates: Partial<Voucher>) => void;
  addVoucher: (voucher: Omit<Voucher, 'id' | 'description'>) => void;
  deleteVoucher: (id: number) => void;
}

// Create the context
const VoucherContext = createContext<VoucherContextType | null>(null);

interface VoucherProviderProps {
  children: ReactNode;
}

function VoucherProvider({ children }: VoucherProviderProps) {
  // Try to load vouchers from localStorage, or use defaults
  const getSavedVouchers = (): Voucher[] => {
    const saved = localStorage.getItem('bestyboy_vouchers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved vouchers', e);
      }
    }
    return getDefaultVouchers() as Voucher[];
  };

  const [vouchers, setVouchers] = useState<Voucher[]>(getSavedVouchers());

  // Save vouchers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bestyboy_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  // Get vouchers by game type
  const getVouchersByGameType = (gameType: string): Voucher[] => {
    return vouchers.filter(v => v.gameType === gameType);
  };

  // Update a voucher
  const updateVoucher = (id: number, updates: Partial<Voucher>): void => {
    setVouchers(prevVouchers => {
      const newVouchers = prevVouchers.map(voucher => {
        if (voucher.id === id) {
          // Create updated voucher
          const updatedVoucher = { ...voucher, ...updates };
          // Regenerate description if amount or bonus changed
          if (updates.amount !== undefined || updates.bonus !== undefined) {
            updatedVoucher.description = createDescription(
              updatedVoucher.gameType,
              updatedVoucher.amount,
              updatedVoucher.bonus
            );
          }
          return updatedVoucher;
        }
        return voucher;
      });
      return newVouchers;
    });
  };

  // Add a new voucher
  const addVoucher = (voucher: Omit<Voucher, 'id' | 'description'>): void => {
    setVouchers(prevVouchers => {
      // Find the highest ID to generate a new unique ID
      const highestId = Math.max(0, ...prevVouchers.map(v => v.id));
      const newId = highestId + 1;
      
      // Create the description
      const description = createDescription(
        voucher.gameType,
        voucher.amount,
        voucher.bonus
      );
      
      // Add the new voucher
      return [...prevVouchers, { ...voucher, id: newId, description }];
    });
  };

  // Delete a voucher
  const deleteVoucher = (id: number): void => {
    setVouchers(prevVouchers => prevVouchers.filter(voucher => voucher.id !== id));
  };

  // Context value
  const value = {
    vouchers,
    getVouchersByGameType,
    updateVoucher,
    addVoucher,
    deleteVoucher
  };

  return (
    <VoucherContext.Provider value={value}>
      {children}
    </VoucherContext.Provider>
  );
}

// Custom hook to use the voucher context
const useVouchers = () => {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error('useVouchers must be used within a VoucherProvider');
  }
  return context;
};

export { VoucherProvider, useVouchers, VoucherContext };