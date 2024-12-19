const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Set up a PostgreSQL pool
const pool = new Pool({
  user: 'postgres',          // Your PostgreSQL username
  host: 'localhost',          // Database host
  database:'gentleluxe',  // Your database name
  password: '6380527763',  // Your PostgreSQL password
  port: 5432,  // Default PostgreSQL port
});

// Define routes
app.get('/userlist', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('select * from userlist');
        res.json(result.rows);
        client.release();
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.post('/data', (req, res) => {
  res.json({ received: req.body });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});