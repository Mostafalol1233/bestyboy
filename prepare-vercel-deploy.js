import fs from 'fs-extra';
import path from 'path';

// This script prepares files for Vercel deployment
async function prepareForVercel() {
  try {
    console.log('Starting Vercel deployment preparation...');
    
    // Ensure directories exist
    await fs.ensureDir('public');
    await fs.ensureDir('public/assets');
    await fs.ensureDir('public/attached_assets');
    await fs.ensureDir('dist');
    
    // Copy all files from attached_assets to public/attached_assets
    if (fs.existsSync('attached_assets')) {
      console.log('Copying from attached_assets directory...');
      const files = await fs.readdir('attached_assets');
      for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.svg')) {
          await fs.copy(
            path.join('attached_assets', file),
            path.join('public/attached_assets', file)
          );
          console.log(`Copied ${file} to public/attached_assets`);
        }
      }
    } else {
      console.log('No attached_assets directory found');
    }
    
    // Copy public/assets to public/attached_assets as a fallback
    if (fs.existsSync('public/assets')) {
      console.log('Copying from public/assets directory...');
      const files = await fs.readdir('public/assets');
      for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.svg')) {
          await fs.copy(
            path.join('public/assets', file),
            path.join('public/attached_assets', file)
          );
          console.log(`Copied ${file} from public/assets to public/attached_assets`);
        }
      }
    } else {
      console.log('No public/assets directory found, creating it...');
      await fs.ensureDir('public/assets');
    }
    
    // Create a copy of the dist directory to ensure paths resolve correctly
    if (fs.existsSync('dist')) {
      console.log('Making dist directory available for API functions...');
      await fs.copy('dist', 'public/dist');
    }
    
    console.log('Completed preparing files for Vercel deployment');
  } catch (err) {
    console.error('Error preparing files for Vercel:', err);
    process.exit(1);
  }
}

prepareForVercel();