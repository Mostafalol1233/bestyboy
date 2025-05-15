// Type declarations for config.js

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface RedeemCodes {
  admin: string;
  crossfireVideo: string;
  pubgVideo: string;
  freefireVideo: string;
}

export interface GameVideo {
  crossfire: string;
  pubg: string;
  freefire: string;
}

export interface GameDefault {
  currency: string;
  imageUrl: string;
}

export interface GameDefaults {
  crossfire: GameDefault;
  pubg: GameDefault;
  freefire: GameDefault;
}

export interface SessionConfig {
  secret: string;
  cookieMaxAge: number;
}

export const adminCredentials: AdminCredentials;
export const redeemCodes: RedeemCodes;
export const gameVideos: GameVideo;
export const gameDefaults: GameDefaults;
export const sessionConfig: SessionConfig;