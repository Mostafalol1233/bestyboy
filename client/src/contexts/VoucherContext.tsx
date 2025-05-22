import React, { createContext, useContext, useState } from 'react';
import { initialVouchers } from '../../shared/initial-data.js';

export const VoucherContext = createContext(null);

export function VoucherProvider({ children }) {
  const [vouchers] = useState(initialVouchers);

  const getVouchersByGameType = (gameType) => {
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