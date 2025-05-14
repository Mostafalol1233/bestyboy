import fs from 'fs-extra';
import path from 'path';

// This script prepares files for Vercel deployment
async function prepareForVercel() {
  try {
    console.log('Starting Vercel deployment preparation...');
    
    // Create necessary directories in dist/public (Vercel's output directory)
    await fs.ensureDir('dist/public');
    await fs.ensureDir('dist/public/assets');
    await fs.ensureDir('dist/public/attached_assets');
    
    // Copy assets from attached_assets to dist/public/attached_assets and dist/public/assets
    if (fs.existsSync('attached_assets')) {
      console.log('Copying from attached_assets directory...');
      const files = await fs.readdir('attached_assets');
      for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.svg')) {
          // Copy to both locations to ensure they're accessible from either path
          await fs.copy(
            path.join('attached_assets', file),
            path.join('dist/public/attached_assets', file)
          );
          await fs.copy(
            path.join('attached_assets', file),
            path.join('dist/public/assets', file)
          );
          console.log(`Copied ${file} to dist/public/attached_assets and dist/public/assets`);
        }
      }
    } else {
      console.log('No attached_assets directory found');
    }
    
    // Copy images from any existing public/assets directory
    if (fs.existsSync('public/assets')) {
      console.log('Copying from public/assets directory...');
      const files = await fs.readdir('public/assets');
      for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.svg')) {
          // Copy to both locations
          await fs.copy(
            path.join('public/assets', file),
            path.join('dist/public/assets', file)
          );
          await fs.copy(
            path.join('public/assets', file),
            path.join('dist/public/attached_assets', file)
          );
          console.log(`Copied ${file} to both asset directories`);
        }
      }
    }
    
    // Create direct asset directories at the root level for additional access paths
    await fs.ensureDir('assets');
    await fs.ensureDir('attached_assets');
    
    // Create symbolic links or copies to ensure access from multiple paths
    console.log('Creating additional asset access paths...');
    if (fs.existsSync('dist/public/assets')) {
      const assets = await fs.readdir('dist/public/assets');
      for (const asset of assets) {
        if (asset.endsWith('.jpg') || asset.endsWith('.png') || asset.endsWith('.gif') || asset.endsWith('.svg')) {
          await fs.copy(
            path.join('dist/public/assets', asset),
            path.join('assets', asset)
          );
        }
      }
    }
    
    // Verify directory contents
    console.log('Verifying asset directories:');
    if (fs.existsSync('dist/public/assets')) {
      console.log('dist/public/assets contains:', await fs.readdir('dist/public/assets'));
    }
    if (fs.existsSync('dist/public/attached_assets')) {
      console.log('dist/public/attached_assets contains:', await fs.readdir('dist/public/attached_assets'));
    }
    
    console.log('Completed preparing files for Vercel deployment');
  } catch (err) {
    console.error('Error preparing files for Vercel:', err);
    process.exit(1);
  }
}

prepareForVercel();