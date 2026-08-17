// ====================================================================
// INITIAL VOUCHER DATA FOR BESTY BOY
// أسعار الباقات مقترحة بالجنيه المصري وقابلة للتعديل من لوحة الإدارة.
// ====================================================================

const catalog = [
  {
    gameType: 'crossfire', currency: 'ZP', imageUrl: '/attached_assets/image_1747412665992.png',
    packs: [[5000, 2500, 120], [10000, 5000, 240], [20000, 10000, 455], [50000, 25000, 1120], [100000, 50000, 2300]],
  },
  {
    gameType: 'pubg', currency: 'UC', imageUrl: '/attached_assets/image_1747412665992.png',
    packs: [[5000, 2500, 120], [10000, 5000, 240], [50000, 25000, 1120]],
  },
  {
    gameType: 'freefire', currency: 'Diamonds', imageUrl: '/attached_assets/image_1747412665992.png',
    packs: [[5000, 2500, 120], [10000, 5000, 240], [50000, 25000, 1120]],
  },
  {
    gameType: 'codm', currency: 'CP', imageUrl: '/assets/freefire.png',
    packs: [[80, 5, 45], [160, 10, 85], [420, 25, 190], [880, 60, 365], [2400, 150, 890]],
  },
  {
    gameType: 'mobilelegends', currency: 'Diamonds', imageUrl: '/assets/images(1).jpg',
    packs: [[86, 8, 55], [172, 18, 100], [257, 30, 145], [514, 70, 270], [1050, 150, 520]],
  },
  {
    gameType: 'valorant', currency: 'VP', imageUrl: '/assets/images(3).jpg',
    packs: [[475, 10, 260], [1000, 25, 520], [2050, 75, 995], [3650, 150, 1700], [5350, 250, 2450]],
  },
  {
    gameType: 'roblox', currency: 'Robux', imageUrl: '/assets/images.jpg',
    packs: [[400, 20, 220], [800, 50, 420], [1700, 100, 850], [4500, 250, 2050]],
  },
  {
    gameType: 'fcmobile', currency: 'FC Points', imageUrl: '/assets/images(4).jpg',
    packs: [[105, 10, 60], [575, 40, 300], [1200, 100, 580], [2500, 200, 1150]],
  },
];

const initialVouchers = catalog.flatMap(({ gameType, currency, imageUrl, packs }) => packs.map(([amount, bonus, price]) => ({
  gameType,
  amount,
  bonus,
  currency,
  price,
  imageUrl,
  description: `${gameType} ${amount} ${currency} + ${bonus} bonus`,
})));

export { initialVouchers };
