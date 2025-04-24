const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const db = require('./db/migration');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, API!' });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    stmt.run(username, hash);
    res.json({ success: true, message: 'User registered' });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
      res.status(409).json({ success: false, message: 'Username already exists.' });
    } else {
      res.status(500).json({ success: false, message: 'Registration failed.' });
    }
  }
});

app.post('/login', (req, res) => {
  res.json({ success: true, message: 'User logged in' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}/`);
});