import express from 'express';
import { registerRoutes } from '../server/routes.js';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static assets
app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));
app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));

// Setup routes
registerRoutes(app);

export default app;