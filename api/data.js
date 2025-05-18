
// Special file for Vercel to ensure consistent data across environments
import { initialVouchers } from '../shared/initial-data.js';

// Function to get all vouchers
export function getVouchers() {
  return initialVouchers;
}

// Function to get vouchers by game type
export function getVouchersByGameType(gameType) {
  return initialVouchers.filter(voucher => voucher.gameType === gameType);
}

// Function to get a specific voucher by id
export function getVoucher(id) {
  const numId = Number(id);
  return initialVouchers.find(voucher => voucher.id === numId);
}

// Export data functions
export default { getVouchers, getVouchersByGameType, getVoucher };
