import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, insertVoucherSchema } from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";
import { z } from "zod";

const MemoryStoreSession = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware
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
  const authenticate = (req: Request, res: Response, next: any) => {
    if (req.session && req.session.user) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Admin middleware
  const authorizeAdmin = (req: Request, res: Response, next: any) => {
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
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Login failed" });
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
      const gameType = req.query.gameType as string;
      let vouchers;
      
      if (gameType) {
        vouchers = await storage.getVouchersByGameType(gameType);
      } else {
        vouchers = await storage.getAllVouchers();
      }
      
      res.json(vouchers);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      res.status(500).json({ message: "Failed to fetch vouchers", error: error.message });
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
      const voucherData = insertVoucherSchema.parse(req.body);
      const voucher = await storage.createVoucher(voucherData);
      res.status(201).json(voucher);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
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

  const httpServer = createServer(app);
  return httpServer;
}
