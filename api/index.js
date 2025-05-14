import express from 'express';
import path from 'path';

// This is a Vercel serverless function handler
export default async (req, res) => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Serve static assets
    app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));
    app.use('/attached_assets', express.static(path.join(process.cwd(), 'public', 'attached_assets')));

    // Import routes dynamically to avoid issues with ESM vs CJS
    const { registerRoutes } = await import('../dist/routes.js');
    await registerRoutes(app);

    // Error handling middleware
    app.use((err, _req, res, _next) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      console.error(err);
    });

    // Handle the current request
    return app(req, res);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};