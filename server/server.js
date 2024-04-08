const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');

// Create an Express app
const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());

// Database connection configuration
const pool = mariadb.createPool({
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  connectionLimit: 5 // Adjust as needed
});

// API endpoint to add favorite item
app.post('/favorites', async (req, res) => {
  const { name, state_province, web_pages } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const query = 'INSERT INTO favorites (name, state_province, web_pages) VALUES (?, ?, ?)';
    await conn.query(query, [name, state_province, JSON.stringify(web_pages)]);
    res.status(201).json({ message: 'Favorite item added successfully' });
  } catch (err) {
    console.error('Error adding favorite item:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
