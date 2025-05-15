import { eq } from "drizzle-orm";
import { db } from "./db";
import { users, vouchers, type User, type InsertUser, type Voucher, type InsertVoucher } from "@shared/schema";
import { IStorage } from "./storage";
import bcrypt from "bcryptjs";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    
    const result = await db.insert(users).values({
      ...insertUser,
      password: hashedPassword
    }).returning();
    
    return result[0];
  }

  async validateCredentials(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) return null;
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  // Voucher methods
  async getAllVouchers(): Promise<Voucher[]> {
    return db.select().from(vouchers);
  }

  async getVouchersByGameType(gameType: string): Promise<Voucher[]> {
    return db.select().from(vouchers).where(eq(vouchers.gameType, gameType));
  }

  async getVoucher(id: number): Promise<Voucher | undefined> {
    const result = await db.select().from(vouchers).where(eq(vouchers.id, id));
    return result[0];
  }

  async createVoucher(insertVoucher: InsertVoucher): Promise<Voucher> {
    const result = await db.insert(vouchers).values(insertVoucher).returning();
    return result[0];
  }

  async updateVoucher(id: number, voucherData: Partial<InsertVoucher>): Promise<Voucher | null> {
    const result = await db.update(vouchers)
      .set(voucherData)
      .where(eq(vouchers.id, id))
      .returning();
    
    return result[0] || null;
  }

  async deleteVoucher(id: number): Promise<boolean> {
    const result = await db.delete(vouchers).where(eq(vouchers.id, id)).returning();
    return result.length > 0;
  }
}