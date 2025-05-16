// Import initial voucher data from shared file
import { initialVouchers } from "@shared/initial-data.js";
import { storage } from "./storage";
import { adminCredentials } from "../config.js";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Initializing in-memory data...");

  try {
    // Admin user is automatically created in the storage constructor,
    // no need to create it here since we're using in-memory storage
    console.log("Admin user initialized in memory");
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }

  try {
    // Vouchers are already initialized in the storage constructor,
    // but we log it here to maintain consistency in output
    console.log("Vouchers initialized in memory");
  } catch (error) {
    console.error("Error initializing vouchers:", error);
  }

  console.log("In-memory data initialization complete!");
}

export default seed;