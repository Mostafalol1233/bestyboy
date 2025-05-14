import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const vouchers = pgTable("vouchers", {
  id: serial("id").primaryKey(),
  gameType: text("game_type").notNull(), // crossfire, pubg, freefire
  amount: integer("amount").notNull(), // e.g. 5000, 10000
  bonus: integer("bonus").notNull(), // e.g. 120, 240
  currency: text("currency").notNull(), // e.g. ZP, UC, Diamonds
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

export const insertVoucherSchema = createInsertSchema(vouchers);

export const loginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertVoucher = z.infer<typeof insertVoucherSchema>;
export type User = typeof users.$inferSelect;
export type Voucher = typeof vouchers.$inferSelect;
export type LoginCredentials = z.infer<typeof loginSchema>;
