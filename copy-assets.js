import fs from 'fs-extra';
import path from 'path';

// Copy the attached assets to the public directory for production build
async function copyAssets() {
  try {
    // Ensure public directory exists
    await fs.ensureDir('public');
    
    // Copy attached_assets to public directory
    if (fs.existsSync('attached_assets')) {
      await fs.copy('attached_assets', 'public/attached_assets');
      console.log('Successfully copied attached_assets to public directory');
    } else {
      console.log('attached_assets directory not found, skipping');
    }
    
    // Copy existing assets to public directory if needed
    if (fs.existsSync('assets') && !fs.existsSync('public/assets')) {
      await fs.copy('assets', 'public/assets');
      console.log('Successfully copied assets to public directory');
    }
  } catch (err) {
    console.error('Error copying assets:', err);
  }
}

copyAssets();