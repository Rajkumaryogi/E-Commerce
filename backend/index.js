import express from 'express';
import dotenv from 'dotenv';

// Load environment variables - works with dotenv@17.2.1
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
  console.log(`Request received at ${new Date().toISOString()}`);
});

// Local development server
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

// Export for Vercel
export default app;