import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Voucher } from '@shared/schema';

const createDescription = (gameType: string, amount: number, bonus: number): string => {
  const currencyMap: Record<string, string> = {
    crossfire: 'ZP',
    pubg: 'UC',
    freefire: 'Diamonds',
    codm: 'CP',
    mobilelegends: 'Diamonds',
    valorant: 'VP',
    roblox: 'Robux',
    fcmobile: 'FC Points',
  };
  const currency = currencyMap[gameType] || '';
  return `${gameType} ${amount.toLocaleString()} ${currency} + ${bonus.toLocaleString()} bonus`;
};

const defaultCrossfireVouchers = [
  { id: 1, gameType: 'crossfire', amount: 5000, bonus: 2500, price: 120, currency: 'ZP', imageUrl: '/assets/packages/bundle-1.svg' },
  { id: 2, gameType: 'crossfire', amount: 10000, bonus: 5000, price: 240, currency: 'ZP', imageUrl: '/assets/packages/bundle-2.svg' },
  { id: 3, gameType: 'crossfire', amount: 20000, bonus: 10000, price: 455, currency: 'ZP', imageUrl: '/assets/packages/bundle-3.svg' },
  { id: 4, gameType: 'crossfire', amount: 50000, bonus: 25000, price: 1120, currency: 'ZP', imageUrl: '/assets/packages/bundle-4.svg' },
  { id: 5, gameType: 'crossfire', amount: 100000, bonus: 50000, price: 2300, currency: 'ZP', imageUrl: '/assets/packages/bundle-5.svg' },
];

const defaultPubgVouchers = [
  { id: 6, gameType: 'pubg', amount: 5000, bonus: 2500, price: 120, currency: 'UC', imageUrl: '/assets/packages/bundle-6.svg' },
  { id: 7, gameType: 'pubg', amount: 10000, bonus: 5000, price: 240, currency: 'UC', imageUrl: '/assets/packages/bundle-7.svg' },
  { id: 8, gameType: 'pubg', amount: 50000, bonus: 25000, price: 1120, currency: 'UC', imageUrl: '/assets/packages/bundle-8.svg' },
];

const defaultFreeFireVouchers = [
  { id: 9, gameType: 'freefire', amount: 5000, bonus: 2500, price: 120, currency: 'Diamonds', imageUrl: '/assets/packages/bundle-9.svg' },
  { id: 10, gameType: 'freefire', amount: 10000, bonus: 5000, price: 240, currency: 'Diamonds', imageUrl: '/assets/packages/bundle-10.svg' },
  { id: 11, gameType: 'freefire', amount: 50000, bonus: 25000, price: 1120, currency: 'Diamonds', imageUrl: '/assets/packages/bundle-11.svg' },
];

const defaultCodmVouchers = [
  { id: 12, gameType: 'codm', amount: 80, bonus: 5, price: 45, currency: 'CP', imageUrl: '/assets/packages/bundle-12.svg' },
  { id: 13, gameType: 'codm', amount: 160, bonus: 10, price: 85, currency: 'CP', imageUrl: '/assets/packages/bundle-13.svg' },
  { id: 14, gameType: 'codm', amount: 420, bonus: 25, price: 190, currency: 'CP', imageUrl: '/assets/packages/bundle-14.svg' },
  { id: 15, gameType: 'codm', amount: 880, bonus: 60, price: 365, currency: 'CP', imageUrl: '/assets/packages/bundle-15.svg' },
  { id: 16, gameType: 'codm', amount: 2400, bonus: 150, price: 890, currency: 'CP', imageUrl: '/assets/packages/bundle-16.svg' },
];

const defaultMobileLegendsVouchers = [
  { id: 17, gameType: 'mobilelegends', amount: 86, bonus: 8, price: 55, currency: 'Diamonds', imageUrl: '/assets/packages/bundle-17.svg' },
  { id: 18, gameType: 'mobilelegends', amount: 172, bonus: 18, price: 100, currency: 'Diamonds', imageUrl: '/assets/packages/bundle-18.svg' },
  { id: 19, gameType: 'mobilelegends', amount: 257, bonus: 30, price: 145, currency: 'Diamonds', imageUrl: '/assets/packages/bundle-19.svg' },
  { id: 20, gameType: 'mobilelegends', amount: 514, bonus: 70, price: 270, currency: 'Diamonds', imageUrl: '/assets/packages/bundle-20.svg' },
  { id: 21, gameType: 'mobilelegends', amount: 1050, bonus: 150, price: 520, currency: 'Diamonds', imageUrl: '/assets/packages/bundle-21.svg' },
];

const defaultValorantVouchers = [
  { id: 22, gameType: 'valorant', amount: 475, bonus: 10, price: 260, currency: 'VP', imageUrl: '/assets/packages/bundle-22.svg' },
  { id: 23, gameType: 'valorant', amount: 1000, bonus: 25, price: 520, currency: 'VP', imageUrl: '/assets/packages/bundle-23.svg' },
  { id: 24, gameType: 'valorant', amount: 2050, bonus: 75, price: 995, currency: 'VP', imageUrl: '/assets/packages/bundle-24.svg' },
  { id: 25, gameType: 'valorant', amount: 3650, bonus: 150, price: 1700, currency: 'VP', imageUrl: '/assets/packages/bundle-25.svg' },
  { id: 26, gameType: 'valorant', amount: 5350, bonus: 250, price: 2450, currency: 'VP', imageUrl: '/assets/packages/bundle-26.svg' },
];

const defaultRobloxVouchers = [
  { id: 27, gameType: 'roblox', amount: 400, bonus: 20, price: 220, currency: 'Robux', imageUrl: '/assets/packages/bundle-27.svg' },
  { id: 28, gameType: 'roblox', amount: 800, bonus: 50, price: 420, currency: 'Robux', imageUrl: '/assets/packages/bundle-28.svg' },
  { id: 29, gameType: 'roblox', amount: 1700, bonus: 100, price: 850, currency: 'Robux', imageUrl: '/assets/packages/bundle-29.svg' },
  { id: 30, gameType: 'roblox', amount: 4500, bonus: 250, price: 2050, currency: 'Robux', imageUrl: '/assets/packages/bundle-30.svg' },
];

const defaultFcMobileVouchers = [
  { id: 31, gameType: 'fcmobile', amount: 105, bonus: 10, price: 60, currency: 'FC Points', imageUrl: '/assets/packages/bundle-31.svg' },
  { id: 32, gameType: 'fcmobile', amount: 575, bonus: 40, price: 300, currency: 'FC Points', imageUrl: '/assets/packages/bundle-32.svg' },
  { id: 33, gameType: 'fcmobile', amount: 1200, bonus: 100, price: 580, currency: 'FC Points', imageUrl: '/assets/packages/bundle-33.svg' },
  { id: 34, gameType: 'fcmobile', amount: 2500, bonus: 200, price: 1150, currency: 'FC Points', imageUrl: '/assets/packages/bundle-34.svg' },
];

const getDefaultVouchers = (): Voucher[] => [
  ...defaultCrossfireVouchers,
  ...defaultPubgVouchers,
  ...defaultFreeFireVouchers,
  ...defaultCodmVouchers,
  ...defaultMobileLegendsVouchers,
  ...defaultValorantVouchers,
  ...defaultRobloxVouchers,
  ...defaultFcMobileVouchers,
].map((voucher) => ({
  ...voucher,
  description: createDescription(voucher.gameType, voucher.amount, voucher.bonus),
})) as Voucher[];

interface VoucherContextType {
  vouchers: Voucher[];
  getVouchersByGameType: (gameType: string) => Voucher[];
  updateVoucher: (id: number, updates: Partial<Voucher>) => void;
  addVoucher: (voucher: Omit<Voucher, 'id' | 'description'>) => void;
  deleteVoucher: (id: number) => void;
}

const VoucherContext = createContext<VoucherContextType | null>(null);

interface VoucherProviderProps { children: ReactNode; }

function VoucherProvider({ children }: VoucherProviderProps) {
  const getSavedVouchers = (): Voucher[] => {
    const defaults = getDefaultVouchers();
    const saved = localStorage.getItem('bestyboy_vouchers');
    if (!saved) return defaults;
    try {
      const parsed = JSON.parse(saved) as Voucher[];
      const defaultsById = new Map(defaults.map((voucher) => [voucher.id, voucher]));
      const savedIds = new Set(parsed.map((voucher) => voucher.id));
      return [...defaults.filter((voucher) => !savedIds.has(voucher.id)), ...parsed].map((voucher) => {
        const defaultVoucher = defaultsById.get(voucher.id);
        return defaultVoucher ? { ...voucher, imageUrl: defaultVoucher.imageUrl } : voucher;
      });
    } catch {
      return defaults;
    }
  };

  const [vouchers, setVouchers] = useState<Voucher[]>(getSavedVouchers);

  useEffect(() => {
    localStorage.setItem('bestyboy_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  const getVouchersByGameType = (gameType: string): Voucher[] => vouchers.filter((voucher) => voucher.gameType === gameType);

  const updateVoucher = (id: number, updates: Partial<Voucher>): void => {
    setVouchers((previous) => previous.map((voucher) => {
      if (voucher.id !== id) return voucher;
      const updated = { ...voucher, ...updates };
      if (updates.amount !== undefined || updates.bonus !== undefined) {
        updated.description = createDescription(updated.gameType, updated.amount, updated.bonus);
      }
      return updated;
    }));
  };

  const addVoucher = (voucher: Omit<Voucher, 'id' | 'description'>): void => {
    setVouchers((previous) => {
      const id = Math.max(0, ...previous.map((item) => item.id)) + 1;
      return [...previous, { ...voucher, id, description: createDescription(voucher.gameType, voucher.amount, voucher.bonus) }];
    });
  };

  const deleteVoucher = (id: number): void => setVouchers((previous) => previous.filter((voucher) => voucher.id !== id));

  return <VoucherContext.Provider value={{ vouchers, getVouchersByGameType, updateVoucher, addVoucher, deleteVoucher }}>{children}</VoucherContext.Provider>;
}

const useVouchers = () => {
  const context = useContext(VoucherContext);
  if (!context) throw new Error('useVouchers must be used within a VoucherProvider');
  return context;
};

export { VoucherProvider, useVouchers, VoucherContext };
