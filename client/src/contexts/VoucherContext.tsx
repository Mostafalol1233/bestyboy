import React, { createContext, useContext, useState, ReactNode } from 'react';
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
// CROSSFIRE VOUCHERS - EDIT VALUES HERE
// ====================================================================
const crossfireVouchers = [
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

// ====================================================================
// PUBG VOUCHERS - EDIT VALUES HERE
// ====================================================================
const pubgVouchers = [
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

// ====================================================================
// FREE FIRE VOUCHERS - EDIT VALUES HERE
// ====================================================================
const freeFireVouchers = [
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

// Add descriptions to all vouchers
const processedCrossfireVouchers = crossfireVouchers.map(voucher => ({
  ...voucher,
  description: createDescription("crossfire", voucher.amount, voucher.bonus),
}));

const processedPubgVouchers = pubgVouchers.map(voucher => ({
  ...voucher,
  description: createDescription("pubg", voucher.amount, voucher.bonus),
}));

const processedFreeFireVouchers = freeFireVouchers.map(voucher => ({
  ...voucher,
  description: createDescription("freefire", voucher.amount, voucher.bonus),
}));

// Combine all vouchers into a single array
const allVouchers = [
  ...processedCrossfireVouchers,
  ...processedPubgVouchers,
  ...processedFreeFireVouchers
];

// ====================================================================
// React Context Setup - Do not edit below this line
// ====================================================================

interface VoucherContextType {
  vouchers: Voucher[];
  getVouchersByGameType: (gameType: string) => Voucher[];
}

export const VoucherContext = createContext<VoucherContextType | null>(null);

interface VoucherProviderProps {
  children: ReactNode;
}

export function VoucherProvider({ children }: VoucherProviderProps) {
  const [vouchers] = useState<Voucher[]>(allVouchers as Voucher[]);

  const getVouchersByGameType = (gameType: string) => {
    return vouchers.filter(v => v.gameType === gameType);
  };

  const value = {
    vouchers,
    getVouchersByGameType,
  };

  return (
    <VoucherContext.Provider value={value}>
      {children}
    </VoucherContext.Provider>
  );
}

export const useVouchers = () => {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error('useVouchers must be used within a VoucherProvider');
  }
  return context;
};