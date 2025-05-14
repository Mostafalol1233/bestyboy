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
    imageUrl: "/assets/images(3).jpg",
    description: "CrossFire card 5k + 120 zp bonus",
  },
  {
    gameType: "crossfire",
    amount: 10000,
    bonus: 240,
    currency: "ZP",
    imageUrl: "/assets/images(2).jpg",
    description: "CrossFire card 10k + 240 zp bonus",
  },
  {
    gameType: "crossfire",
    amount: 50000,
    bonus: 1120,
    currency: "ZP",
    imageUrl: "/assets/images(1).jpg",
    description: "CrossFire card 50k + 1120 zp bonus",
  },
  {
    gameType: "crossfire",
    amount: 100000,
    bonus: 2300,
    currency: "ZP",
    imageUrl: "/assets/images.jpg",
    description: "CrossFire card 100k + 2300 zp bonus",
  },
  
  // PUBG vouchers
  {
    gameType: "pubg",
    amount: 5000,
    bonus: 120,
    currency: "UC",
    imageUrl: "/assets/images(4).jpg",
    description: "PUBG card 5k + 120 UC bonus",
  },
  {
    gameType: "pubg",
    amount: 10000,
    bonus: 240,
    currency: "UC",
    imageUrl: "/assets/images(5).jpg",
    description: "PUBG card 10k + 240 UC bonus",
  },
  {
    gameType: "pubg",
    amount: 50000,
    bonus: 1120,
    currency: "UC",
    imageUrl: "/assets/images(6).jpg",
    description: "PUBG card 50k + 1120 UC bonus",
  },
  
  // Free Fire vouchers
  {
    gameType: "freefire",
    amount: 5000,
    bonus: 120,
    currency: "Diamonds",
    imageUrl: "/assets/FB_IMG_1747248882099.jpg",
    description: "Free Fire card 5k + 120 Diamonds bonus",
  },
  {
    gameType: "freefire",
    amount: 10000,
    bonus: 240,
    currency: "Diamonds",
    imageUrl: "/assets/FB_IMG_1747248882099.jpg",
    description: "Free Fire card 10k + 240 Diamonds bonus",
  },
  {
    gameType: "freefire",
    amount: 50000,
    bonus: 1120,
    currency: "Diamonds",
    imageUrl: "/assets/FB_IMG_1747248882099.jpg",
    description: "Free Fire card 50k + 1120 Diamonds bonus",
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
