import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load local .env if present (Vercel provides env vars in production)
dotenv.config();

// In serverless environments (like Vercel) you must NOT call app.listen().
// Instead export a handler that reuses the Express app to handle each request.

let dbConnected = false;
async function ensureDB() {
  if (dbConnected) return;
  await connectDB();
  dbConnected = true;
}

export default async function handler(req, res) {
  try {
    await ensureDB();
    // Express apps are callable as handlers
    return app(req, res);
  } catch (err) {
    console.error('Server handler error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}