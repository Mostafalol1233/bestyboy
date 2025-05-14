import fs from 'fs-extra';
import path from 'path';

// This script prepares files for Vercel deployment
async function prepareForVercel() {
  try {
    // Ensure public directory exists
    await fs.ensureDir('public');
    
    // Create assets directory if it doesn't exist
    await fs.ensureDir('public/assets');
    
    // Create attached_assets directory if it doesn't exist
    await fs.ensureDir('public/attached_assets');
    
    // Copy all files from attached_assets to public/attached_assets
    if (fs.existsSync('attached_assets')) {
      const files = await fs.readdir('attached_assets');
      for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif')) {
          await fs.copy(
            path.join('attached_assets', file),
            path.join('public/attached_assets', file)
          );
          console.log(`Copied ${file} to public/attached_assets`);
        }
      }
    }
    
    // Copy all public/assets files to public/attached_assets to ensure access from both paths
    if (fs.existsSync('public/assets')) {
      const files = await fs.readdir('public/assets');
      for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif')) {
          await fs.copy(
            path.join('public/assets', file),
            path.join('public/attached_assets', file)
          );
          console.log(`Copied ${file} from public/assets to public/attached_assets`);
        }
      }
    }
    
    console.log('Completed preparing files for Vercel deployment');
  } catch (err) {
    console.error('Error preparing files for Vercel:', err);
  }
}

prepareForVercel();