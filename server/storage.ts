import { users, type User, type InsertUser, vouchers, type Voucher, type InsertVoucher } from "@shared/schema";
import bcrypt from "bcryptjs";

// Import initial voucher data from shared file to ensure consistency between environments
import { initialVouchers } from "@shared/initial-data.js";

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

    // Import admin credentials from config file
    import('../config.js').then(config => {
      // Create initial admin user with credentials from config
      this.createUser({
        username: config.adminCredentials.username,
        password: bcrypt.hashSync(config.adminCredentials.password, 10),
        isAdmin: true,
      });
    }).catch(error => {
      console.error("Failed to load config file, using default admin credentials", error);
      // Fallback to default admin credentials
      this.createUser({
        username: "admin",
        password: bcrypt.hashSync("highwaygaming123", 10),
        isAdmin: true,
      });
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
    const user: User = { 
      id, 
      username: insertUser.username, 
      password: insertUser.password, 
      isAdmin: insertUser.isAdmin || false 
    };
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
    // Ensure price is always set with a default if missing
    // Use game-specific default prices to ensure values are never undefined
    let defaultPrice = 75; // Default base price
    if (insertVoucher.gameType === 'pubg') defaultPrice = 80;
    if (insertVoucher.gameType === 'freefire') defaultPrice = 70;
    if (insertVoucher.amount >= 10000) defaultPrice *= 2;
    if (insertVoucher.amount >= 50000) defaultPrice *= 4;
    
    const price = insertVoucher.price ?? defaultPrice;
    const voucher: Voucher = { ...insertVoucher, price, id };
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

// Use MemStorage for simplicity and compatibility
export const storage = new MemStorage();