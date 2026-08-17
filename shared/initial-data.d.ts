declare module "@shared/initial-data.js" {
  export interface InitialVoucher {
    gameType: string;
    amount: number;
    bonus: number;
    currency: string;
    price?: number;
    imageUrl: string;
    description: string;
  }

  export const initialVouchers: InitialVoucher[];
}
