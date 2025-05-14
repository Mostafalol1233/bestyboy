import fs from 'fs-extra';
import path from 'path';

// Copy assets to all necessary directories for production/development
async function copyAssets() {
  try {
    console.log('Starting asset copy process...');
    
    // Ensure all required directories exist
    await fs.ensureDir('public');
    await fs.ensureDir('public/assets');
    await fs.ensureDir('public/attached_assets');
    await fs.ensureDir('dist/public/assets');
    await fs.ensureDir('dist/public/attached_assets');
    await fs.ensureDir('assets');
    
    // List of all image files in attached_assets
    const attachedAssets = [];
    if (fs.existsSync('attached_assets')) {
      const files = await fs.readdir('attached_assets');
      for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.svg')) {
          attachedAssets.push(file);
        }
      }
    }
    
    // Copy all image files to all possible locations
    for (const file of attachedAssets) {
      const sourcePath = path.join('attached_assets', file);
      
      // Copy to public directory paths
      await fs.copy(sourcePath, path.join('public/attached_assets', file));
      await fs.copy(sourcePath, path.join('public/assets', file));
      
      // Copy to dist directory paths (for production)
      await fs.copy(sourcePath, path.join('dist/public/attached_assets', file));
      await fs.copy(sourcePath, path.join('dist/public/assets', file));
      
      // Copy to root assets directory
      await fs.copy(sourcePath, path.join('assets', file));
      
      console.log(`Copied ${file} to all asset directories`);
    }
    
    // Also handle files that might already exist in public/assets
    if (fs.existsSync('public/assets')) {
      const assetFiles = await fs.readdir('public/assets');
      for (const file of assetFiles) {
        if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.svg')) {
          // Copy to all other directories
          await fs.copy(path.join('public/assets', file), path.join('public/attached_assets', file));
          await fs.copy(path.join('public/assets', file), path.join('dist/public/assets', file));
          await fs.copy(path.join('public/assets', file), path.join('dist/public/attached_assets', file));
          await fs.copy(path.join('public/assets', file), path.join('assets', file));
          
          console.log(`Copied existing asset ${file} to all directories`);
        }
      }
    }
    
    console.log('Successfully copied all assets');
  } catch (err) {
    console.error('Error copying assets:', err);
    process.exit(1);
  }
}

copyAssets();