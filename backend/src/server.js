import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import { connectDB } from './config/db.js'; // ✅ no need for ../src, since you’re already inside src

dotenv.config();

// ✅ For ES modules (__dirname, __filename equivalents)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// ✅ Server + DB connection
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MONGO DB connection failed!', err);
  });
