import { users, type User, type InsertUser, vouchers, type Voucher, type InsertVoucher } from "@shared/schema";
import bcrypt from "bcryptjs";

// Initial voucher data
const initialVouchers: InsertVoucher[] = [
  // CrossFire vouchers
  {
    gameType: "crossfire",
    amount: 5000,
    bonus: 120,
    currency: "ZP",
    imageUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f",
    description: "Standard game voucher with bonus points",
  },
  {
    gameType: "crossfire",
    amount: 10000,
    bonus: 240,
    currency: "ZP",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    description: "Medium game voucher with bonus points",
  },
  {
    gameType: "crossfire",
    amount: 50000,
    bonus: 1120,
    currency: "ZP",
    imageUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
    description: "Large game voucher with bonus points",
  },
  {
    gameType: "crossfire",
    amount: 100000,
    bonus: 2300,
    currency: "ZP",
    imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf",
    description: "Premium game voucher with bonus points",
  },
  {
    gameType: "crossfire",
    amount: 20000,
    bonus: 455,
    currency: "ZP",
    imageUrl: "https://pixabay.com/get/gbb5254001782899dd2c9ec10a68da9de4b311985d9e9672aefe068cfe1531500465f186e0d0cb8033895b1fe21750a80037c898570f886de97ed9ae9731809e1_1280.jpg",
    description: "Special game voucher with bonus points",
  },
  
  // PUBG vouchers
  {
    gameType: "pubg",
    amount: 5000,
    bonus: 120,
    currency: "UC",
    imageUrl: "https://pixabay.com/get/g5d7e5bf23dfa6e6d7cb09e7439ee56edb28804c17535e7f293dfb5f62f802be129a29469ba9ed096e7381933eb84687fbbe5f4d27f54db43f4e222f96646ecc2_1280.jpg",
    description: "Standard game voucher with bonus points",
  },
  {
    gameType: "pubg",
    amount: 10000,
    bonus: 240,
    currency: "UC",
    imageUrl: "https://images.unsplash.com/photo-1605152276897-4f618f831968",
    description: "Medium game voucher with bonus points",
  },
  {
    gameType: "pubg",
    amount: 50000,
    bonus: 1120,
    currency: "UC",
    imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    description: "Large game voucher with bonus points",
  },
  
  // Free Fire vouchers
  {
    gameType: "freefire",
    amount: 5000,
    bonus: 120,
    currency: "Diamonds",
    imageUrl: "https://images.unsplash.com/photo-1498736297812-3a08021f206f",
    description: "Standard game voucher with bonus points",
  },
  {
    gameType: "freefire",
    amount: 10000,
    bonus: 240,
    currency: "Diamonds",
    imageUrl: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9",
    description: "Medium game voucher with bonus points",
  },
  {
    gameType: "freefire",
    amount: 50000,
    bonus: 1120,
    currency: "Diamonds",
    imageUrl: "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33",
    description: "Large game voucher with bonus points",
  },
];

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateCredentials(username: string, password: string): Promise<User | null>;
  
  // Voucher methods
  getAllVouchers(): Promise<Voucher[]>;
  getVouchersByGameType(gameType: string): Promise<Voucher[]>;
  getVoucher(id: number): Promise<Voucher | undefined>;
  createVoucher(voucher: InsertVoucher): Promise<Voucher>;
  updateVoucher(id: number, voucher: Partial<InsertVoucher>): Promise<Voucher | null>;
  deleteVoucher(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vouchers: Map<number, Voucher>;
  private userCurrentId: number;
  private voucherCurrentId: number;

  constructor() {
    this.users = new Map();
    this.vouchers = new Map();
    this.userCurrentId = 1;
    this.voucherCurrentId = 1;
    
    // Create initial admin user
    this.createUser({
      username: "admin",
      password: bcrypt.hashSync("admin123", 10),
      isAdmin: true,
    });
    
    // Create initial vouchers
    initialVouchers.forEach((voucher) => {
      this.createVoucher(voucher);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async validateCredentials(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) return null;
    
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    return isPasswordValid ? user : null;
  }

  // Voucher methods
  async getAllVouchers(): Promise<Voucher[]> {
    return Array.from(this.vouchers.values());
  }
  
  async getVouchersByGameType(gameType: string): Promise<Voucher[]> {
    return Array.from(this.vouchers.values()).filter(
      (voucher) => voucher.gameType === gameType,
    );
  }
  
  async getVoucher(id: number): Promise<Voucher | undefined> {
    return this.vouchers.get(id);
  }
  
  async createVoucher(insertVoucher: InsertVoucher): Promise<Voucher> {
    const id = this.voucherCurrentId++;
    const voucher: Voucher = { ...insertVoucher, id };
    this.vouchers.set(id, voucher);
    return voucher;
  }
  
  async updateVoucher(id: number, voucherData: Partial<InsertVoucher>): Promise<Voucher | null> {
    const existingVoucher = this.vouchers.get(id);
    if (!existingVoucher) return null;
    
    const updatedVoucher = { ...existingVoucher, ...voucherData };
    this.vouchers.set(id, updatedVoucher);
    return updatedVoucher;
  }
  
  async deleteVoucher(id: number): Promise<boolean> {
    return this.vouchers.delete(id);
  }
}

export const storage = new MemStorage();
