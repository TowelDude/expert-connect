import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Load edge functions
const functionsDir = join(__dirname, '../supabase/functions');

// Match experts endpoint
app.post('/match-experts', async (req, res) => {
  try {
    const { handler } = await import(join(functionsDir, 'match-experts/index.ts'));
    const response = await handler(req);
    res.status(response.status).json(await response.json());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { handler } = await import(join(functionsDir, 'chat/index.ts'));
    const response = await handler(req);
    res.status(response.status).json(await response.json());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit review endpoint
app.post('/submit-review', async (req, res) => {
  try {
    const { handler } = await import(join(functionsDir, 'submit-review/index.ts'));
    const response = await handler(req);
    res.status(response.status).json(await response.json());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.EDGE_PORT || 54321;
app.listen(port, () => {
  console.log(`Edge Functions development server running on port ${port}`);
});