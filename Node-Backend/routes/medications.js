const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const queryResult = await db.query('SELECT drug_name FROM medication');
    res.json(queryResult.rows.map(row => row.drug_name));
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ message: "Error fetching medications", error: error.message });
  }
});

module.exports = router;
