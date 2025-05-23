// ====================================================================
// INITIAL VOUCHER DATA FOR BESTY BOY
// ====================================================================

// Helper function to automatically create description based on values
const createDescription = (gameType, amount, bonus) => {
  const amountK = (amount / 1000).toFixed(0);
  const bonusK = (bonus / 1000).toFixed(0);

  const currencyMap = {
    crossfire: "zp",
    pubg: "UC",
    freefire: "Diamonds",
  };

  const currency = currencyMap[gameType] || "";
  return `${gameType} card ${amountK}k + ${bonusK}k ${currency} bonus`;
};

// ====================================================================
// CROSSFIRE VOUCHERS - EDIT VALUES HERE
// ====================================================================
const crossfireVouchers = [
  {
    amount: 5000, // Amount in points
    bonus: 2.5, // Bonus points (half of amount)
    price: 120, // Price in EGP
  },
  {
    amount: 10000,
    bonus: 5000,
    price: 240,
  },
  {
    amount: 20000,
    bonus: 10000,
    price: 455,
  },
  {
    amount: 50000,
    bonus: 25000,
    price: 1120,
  },
  {
    amount: 100000,
    bonus: 50000,
    price: 2300,
  },
];

// ====================================================================
// PUBG VOUCHERS - EDIT VALUES HERE
// ====================================================================
const pubgVouchers = [
  {
    amount: 5000, // Amount in UC
    bonus: 250, // Bonus UC (half of amount)
    price: 120, // Price in EGP
  },
  {
    amount: 10000,
    bonus: 500,
    price: 240,
  },
  {
    amount: 5000,
    bonus: 2500,
    price: 1120,
  },
];

// ====================================================================
// FREE FIRE VOUCHERS - EDIT VALUES HERE
// ====================================================================
const freeFireVouchers = [
  {
    amount: 500, // Amount in Diamonds
    bonus: 2500, // Bonus Diamonds (half of amount)
    price: 120, // Price in EGP
  },
  {
    amount: 1000,
    bonus: 500,
    price: 240,
  },
  {
    amount: 500,
    bonus: 25,
    price: 1120,
  },
];

// ====================================================================
// DON'T EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING
// ====================================================================

// Process CrossFire vouchers
const processedCrossfireVouchers = crossfireVouchers.map((voucher) => ({
  gameType: "crossfire",
  amount: voucher.amount,
  bonus: voucher.bonus,
  currency: "ZP",
  price: voucher.price,
  imageUrl: "/attached_assets/image_1747412665992.png",
  description: createDescription("crossfire", voucher.amount, voucher.bonus),
}));

// Process PUBG vouchers
const processedPubgVouchers = pubgVouchers.map((voucher) => ({
  gameType: "pubg",
  amount: voucher.amount,
  bonus: voucher.bonus,
  currency: "UC",
  price: voucher.price,
  imageUrl: "/attached_assets/image_1747412665992.png",
  description: createDescription("pubg", voucher.amount, voucher.bonus),
}));

// Process Free Fire vouchers
const processedFreeFireVouchers = freeFireVouchers.map((voucher) => ({
  gameType: "freefire",
  amount: voucher.amount,
  bonus: voucher.bonus,
  currency: "Diamonds",
  price: voucher.price,
  imageUrl: "/attached_assets/image_1747412665992.png",
  description: createDescription("freefire", voucher.amount, voucher.bonus),
}));

// Export all vouchers
export const initialVouchers = [
  ...processedCrossfireVouchers,
  ...processedPubgVouchers,
  ...processedFreeFireVouchers,
];
