// Main configuration file for Highway Gaming
// This file contains important settings that will be used across the application

// Admin credentials (used for authentication)
export const adminCredentials = {
  username: "admin",
  password: "highwaygaming123", // This will be hashed in storage.ts
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
  crossfire: "https://www.youtube.com/watch?v=SxTaf18Hndw", // CrossFire video
  pubg: "https://www.youtube.com/watch?v=SxTaf18Hndw", // PUBG video 
  freefire: "https://www.youtube.com/watch?v=SxTaf18Hndw", // Free Fire video
};

// Default game assets and settings
export const gameDefaults = {
  crossfire: {
    currency: "ZP",
    imageUrl: "/assets/images.jpg",
  },
  pubg: {
    currency: "UC",
    imageUrl: "/assets/images(5).jpg",
  },
  freefire: {
    currency: "Diamonds",
    imageUrl: "/assets/image_1747322313057.png", // Updated Free Fire image
  }
};

// Session settings
export const sessionConfig = {
  secret: process.env.SESSION_SECRET || "highway-gaming-secret",
  cookieMaxAge: 1000 * 60 * 60 * 24, // 1 day
};