// Main configuration file for Besty Boy Gaming
// This file contains important settings that will be used across the application

// Admin credentials (used for authentication)
export const adminCredentials = {
  username: "admin",
  password: "bestyboy123", // This will be hashed in storage.ts
};

// Redeem codes for special features
export const redeemCodes = {
  admin: "00001", // Code to access admin login
  crossfireVideo: "11111", // Code for CrossFire video
  pubgVideo: "22222", // Code for PUBG video
  freefireVideo: "33333", // Code for Free Fire video
};

// Video URLs for each game type
export const gameVideos = {
  crossfire: "https://www.youtube.com/@Besty_Boy", // CrossFire video
  pubg: "https://www.youtube.com/@Besty_Boy", // PUBG video 
  freefire: "https://www.youtube.com/@Besty_Boy", // Free Fire video
};

// Default game assets and settings
export const gameDefaults = {
  crossfire: {
    currency: "ZP",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
  pubg: {
    currency: "UC",
    imageUrl: "/attached_assets/image_1747412665992.png",
  },
  freefire: {
    currency: "Diamonds",
    imageUrl: "/attached_assets/image_1747412665992.png", // Updated with Besty Boy image
  }
};

// Session settings
export const sessionConfig = {
  secret: process.env.SESSION_SECRET || "bestyboy-gaming-secret",
  cookieMaxAge: 1000 * 60 * 60 * 24, // 1 day
};