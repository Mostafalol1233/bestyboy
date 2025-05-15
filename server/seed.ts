import { db } from "./db";
import { users, vouchers } from "@shared/schema";
import bcrypt from "bcryptjs";
import { adminCredentials } from "../config.js";

// Initial voucher data
const initialVouchers = [
  // CrossFire vouchers
  {
    gameType: "crossfire",
    amount: 5000,
    bonus: 120,
    currency: "ZP",
    price: 75,
    imageUrl: "/assets/images(3).jpg",
    description: "CrossFire card 5k + 120 zp bonus",
  },
  {
    gameType: "crossfire",
    amount: 10000,
    bonus: 240,
    currency: "ZP",
    price: 150,
    imageUrl: "/assets/images(2).jpg",
    description: "CrossFire card 10k + 240 zp bonus",
  },
  {
    gameType: "crossfire",
    amount: 50000,
    bonus: 1120,
    currency: "ZP",
    price: 600,
    imageUrl: "/assets/images(1).jpg",
    description: "CrossFire card 50k + 1120 zp bonus",
  },
  {
    gameType: "crossfire",
    amount: 100000,
    bonus: 2300,
    currency: "ZP",
    price: 1200,
    imageUrl: "/assets/images.jpg",
    description: "CrossFire card 100k + 2300 zp bonus",
  },

  // PUBG vouchers
  {
    gameType: "pubg",
    amount: 5000,
    bonus: 120,
    currency: "UC",
    price: 80,
    imageUrl: "/assets/images(4).jpg",
    description: "PUBG card 5k + 120 UC bonus",
  },
  {
    gameType: "pubg",
    amount: 10000,
    bonus: 240,
    currency: "UC",
    price: 160,
    imageUrl: "/assets/images(5).jpg",
    description: "PUBG card 10k + 240 UC bonus",
  },
  {
    gameType: "pubg",
    amount: 50000,
    bonus: 1120,
    currency: "UC",
    price: 650,
    imageUrl: "/assets/images(6).jpg",
    description: "PUBG card 50k + 1120 UC bonus",
  },

  // Free Fire vouchers
  {
    gameType: "freefire",
    amount: 5000,
    bonus: 120,
    currency: "Diamonds",
    price: 70,
    imageUrl: "/assets/freefire.png",
    description: "Free Fire card 5k + 120 Diamonds bonus",
  },
  {
    gameType: "freefire",
    amount: 10000,
    bonus: 240,
    currency: "Diamonds",
    price: 140,
    imageUrl: "/assets/freefire2.png",
    description: "Free Fire card 10k + 240 Diamonds bonus",
  },
  {
    gameType: "freefire",
    amount: 50000,
    bonus: 1120,
    currency: "Diamonds",
    price: 550,
    imageUrl: "/assets/FB_IMG_1747248882099.jpg",
    description: "Free Fire card 50k + 1120 Diamonds bonus",
  },
];

async function seed() {
  console.log("Seeding database...");

  // Create admin user
  try {
    const existingAdmin = await db.select().from(users).where(eq => eq.username === adminCredentials.username);
    
    if (existingAdmin.length === 0) {
      console.log("Creating admin user...");
      await db.insert(users).values({
        username: adminCredentials.username,
        password: bcrypt.hashSync(adminCredentials.password, 10),
        isAdmin: true,
      });
    } else {
      console.log("Admin user already exists, skipping creation");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }

  // Create vouchers
  try {
    const existingVouchers = await db.select().from(vouchers);
    
    if (existingVouchers.length === 0) {
      console.log("Creating initial vouchers...");
      for (const voucher of initialVouchers) {
        await db.insert(vouchers).values(voucher);
      }
    } else {
      console.log("Vouchers already exist, skipping creation");
    }
  } catch (error) {
    console.error("Error creating vouchers:", error);
  }

  console.log("Database seeding complete!");
}

export default seed;