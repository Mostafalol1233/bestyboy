// api/index.js - Vercel serverless API
import express from 'express';
import path from 'path';
import { createServer } from 'http';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import MemoryStore from 'memorystore';

// Direct implementation of storage for Vercel serverless
class MemStorage {
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

    // Add initial vouchers
    this.initializeVouchers();
  }

  initializeVouchers() {
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
        price: 75,
        imageUrl: "/attached_assets/freefire1.png",
        description: "Free Fire card 5k + 120 Diamonds bonus",
      },
      {
        gameType: "freefire",
        amount: 10000,
        bonus: 240,
        currency: "Diamonds",
        price: 150,
        imageUrl: "/attached_assets/freefire2.png",
        description: "Free Fire card 10k + 240 Diamonds bonus",
      },
      {
        gameType: "freefire",
        amount: 50000,
        bonus: 1120,
        currency: "Diamonds",
        price: 650,
        imageUrl: "/attached_assets/freefire1.png",
        description: "Free Fire card 50k + 1120 Diamonds bonus",
      },
    ];

    initialVouchers.forEach(voucher => {
      this.createVoucher(voucher);
    });
  }

  // User methods
  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser) {
    const id = this.userCurrentId++;
    const user = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      isAdmin: insertUser.isAdmin || false
    };
    this.users.set(id, user);
    return user;
  }

  async validateCredentials(username, password) {
    const user = await this.getUserByUsername(username);
    if (!user) return null;
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    return isPasswordValid ? user : null;
  }

  // Voucher methods
  async getAllVouchers() {
    return Array.from(this.vouchers.values());
  }

  async getVouchersByGameType(gameType) {
    return Array.from(this.vouchers.values()).filter(
      (voucher) => voucher.gameType === gameType
    );
  }

  async getVoucher(id) {
    return this.vouchers.get(id);
  }

  async createVoucher(insertVoucher) {
    const id = this.voucherCurrentId++;
    const voucher = { ...insertVoucher, id };
    this.vouchers.set(id, voucher);
    return voucher;
  }

  async updateVoucher(id, voucherData) {
    const existingVoucher = this.vouchers.get(id);
    if (!existingVoucher) return null;
    const updatedVoucher = { ...existingVoucher, ...voucherData };
    this.vouchers.set(id, updatedVoucher);
    return updatedVoucher;
  }

  async deleteVoucher(id) {
    return this.vouchers.delete(id);
  }
}

// Create storage instance
const storage = new MemStorage();

// Login schema for validation
const loginSchema = {
  parse: (data) => {
    if (!data.username || data.username.length < 4) {
      throw new Error('Username must be at least 4 characters');
    }
    if (!data.password || data.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    return data;
  }
};

// Serverless handler function
const createServerlessApp = async () => {
  const app = express();
  const MemoryStoreSession = MemoryStore(session);
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Setup all possible paths for static assets to ensure images work
  // Try all possible directories where assets might be located
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
  app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));
  app.use('/assets', express.static(path.join(process.cwd(), 'dist', 'public', 'assets')));
  
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'public', 'attached_assets')));
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'dist', 'public', 'attached_assets')));

  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || "highway-gaming-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
  }));

  // Authentication middleware
  const authenticate = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Admin middleware
  const authorizeAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
      return next();
    }
    res.status(403).json({ message: "Forbidden - Admin access required" });
  };

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      const user = await storage.validateCredentials(credentials.username, credentials.password);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Store user in session (without password)
      req.session.user = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      };
      
      res.json({
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      res.status(400).json({ message: error.message || "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.session && req.session.user) {
      return res.json(req.session.user);
    }
    res.status(401).json({ message: "Not authenticated" });
  });

  // Voucher routes
  app.get("/api/vouchers", async (req, res) => {
    try {
      const gameType = req.query.gameType;
      let vouchers;
      
      if (gameType) {
        vouchers = await storage.getVouchersByGameType(gameType);
      } else {
        vouchers = await storage.getAllVouchers();
      }
      
      res.json(vouchers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vouchers" });
    }
  });

  app.get("/api/vouchers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const voucher = await storage.getVoucher(id);
      
      if (!voucher) {
        return res.status(404).json({ message: "Voucher not found" });
      }
      
      res.json(voucher);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch voucher" });
    }
  });

  // Admin routes (protected)
  app.post("/api/vouchers", authenticate, authorizeAdmin, async (req, res) => {
    try {
      const voucherData = req.body;
      const voucher = await storage.createVoucher(voucherData);
      res.status(201).json(voucher);
    } catch (error) {
      res.status(500).json({ message: "Failed to create voucher" });
    }
  });

  app.put("/api/vouchers/:id", authenticate, authorizeAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const voucherData = req.body;
      
      const updatedVoucher = await storage.updateVoucher(id, voucherData);
      
      if (!updatedVoucher) {
        return res.status(404).json({ message: "Voucher not found" });
      }
      
      res.json(updatedVoucher);
    } catch (error) {
      res.status(500).json({ message: "Failed to update voucher" });
    }
  });

  app.delete("/api/vouchers/:id", authenticate, authorizeAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteVoucher(id);
      
      if (!success) {
        return res.status(404).json({ message: "Voucher not found" });
      }
      
      res.json({ message: "Voucher deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete voucher" });
    }
  });

  // Error handling middleware
  app.use((err, _req, res, _next) => {
    console.error(err);
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  return app;
};

// Serverless handler
export default async (req, res) => {
  try {
    const app = await createServerlessApp();
    
    // Handle the request using the Express app
    return app(req, res);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message 
    });
  }
};