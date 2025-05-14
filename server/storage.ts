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
    imageUrl: "https://i.ytimg.com/vi/SdZ1xcSgIFk/maxresdefault.jpg",
    description: "CrossFire 5K points - Fast delivery",
  },
  {
    gameType: "crossfire",
    amount: 10000,
    bonus: 240,
    currency: "ZP",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1150/header.jpg",
    description: "CrossFire 10K points with extra bonus",
  },
  {
    gameType: "crossfire",
    amount: 50000,
    bonus: 1120,
    currency: "ZP",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1150/ss_e78022710d05d2b43119a3b68967e0fbec73e5af.jpg",
    description: "CrossFire Mega Pack - Best value",
  },
  {
    gameType: "crossfire",
    amount: 100000,
    bonus: 2300,
    currency: "ZP",
    imageUrl: "https://static.wikia.nocookie.net/crossfirefps/images/e/e6/CrossFire_-_Main_Art.jpg",
    description: "CrossFire Ultimate Bundle - Huge bonus",
  },
  {
    gameType: "crossfire",
    amount: 20000,
    bonus: 455,
    currency: "ZP",
    imageUrl: "https://cdn2.unrealengine.com/egs-crossfirex-remedy-s1-2560x1440-01-2560x1440-8d97ce62c7ec.jpg",
    description: "CrossFire Pro Pack - Special offer",
  },
  
  // PUBG vouchers
  {
    gameType: "pubg",
    amount: 5000,
    bonus: 120,
    currency: "UC",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/578080/capsule_616x353.jpg",
    description: "PUBG Basic UC Pack - Fast delivery",
  },
  {
    gameType: "pubg",
    amount: 10000,
    bonus: 240,
    currency: "UC",
    imageUrl: "https://assets.pikiran-rakyat.com/crop/0x35:720x461/x/photo/2022/09/19/2655649061.jpg",
    description: "PUBG Standard UC Pack - Extra value",
  },
  {
    gameType: "pubg",
    amount: 50000,
    bonus: 1120,
    currency: "UC",
    imageUrl: "https://cdn1.epicgames.com/offer/4f85a887f57a40b88d5d27c36fceb7df/EGS_PUBGBATTLEGROUNDS_KraftonInc_S1_2560x1440-fb7aeacea0277acd08caf4b246773880",
    description: "PUBG Mega UC Pack - Premium offer",
  },
  
  // Free Fire vouchers
  {
    gameType: "freefire",
    amount: 5000,
    bonus: 120,
    currency: "Diamonds",
    imageUrl: "https://cdn.pocket-lint.com/r/s/970x/assets/images/159604-games-review-garena-free-fire-image1-e2nakk37tw-jpg.webp",
    description: "Free Fire Basic Pack - Fast delivery",
  },
  {
    gameType: "freefire",
    amount: 10000,
    bonus: 240,
    currency: "Diamonds",
    imageUrl: "https://wallpapercave.com/wp/wp5027577.jpg",
    description: "Free Fire Standard Pack - Extra value",
  },
  {
    gameType: "freefire",
    amount: 50000,
    bonus: 1120,
    currency: "Diamonds",
    imageUrl: "https://img.utdstc.com/screen/1/garena-free-fire-max-008.jpg",
    description: "Free Fire Mega Pack - Premium offer",
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
