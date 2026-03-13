const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const router = express.Router();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Register Donor
router.post('/register_donor', authenticateToken, async (req, res) => {
  const { name, blood_type, location, phone } = req.body;

  try {
    await db.query('INSERT INTO donors (name, blood_type, location, phone) VALUES (?, ?, ?, ?)', 
      [name, blood_type, location, phone]);
    res.status(201).json({ message: 'Donor registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering donor' });
  }
});

// Get Donors
router.get('/donors', authenticateToken, async (req, res) => {
  try {
    const [donors] = await db.query('SELECT * FROM donors');
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching donors' });
  }
});

module.exports = router;
