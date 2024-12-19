const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Secret key for signing JWT
const JWT_SECRET = 'your_secret_key';

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

// Set up a PostgreSQL pool
const pool = new Pool({
  user: 'postgres',          // Your PostgreSQL username
  host: 'localhost',          // Database host
  database:'gentleluxe',  // Your database name
  password: '6380527763',  // Your PostgreSQL password
  port: 5432,  // Default PostgreSQL port
});


// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send('Unauthorized: No token provided');
  }
  const token = authHeader.split(' ')[1]; // Extract the token
  if (!token) {
    return res.status(401).send('Unauthorized: Token is missing');
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized: Invalid token');
    }
    req.user = decoded; // Save user info for later use
    next();
  });
};



// crud operation

// set userlist table from database
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

// app.post('/data', (req, res) => {
//   res.json({ received: req.body });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});