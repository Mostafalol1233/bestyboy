-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY, 
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

-- Create vouchers table
CREATE TABLE IF NOT EXISTS vouchers (
  id SERIAL PRIMARY KEY,
  game_type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  bonus INTEGER NOT NULL,
  currency TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL
);