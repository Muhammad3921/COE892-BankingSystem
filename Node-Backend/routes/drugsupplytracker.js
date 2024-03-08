const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const medicationResult = await db.query('SELECT * FROM patientmedication WHERE patient_id = $1', [userId]);
     
    if (medicationResult.rows.length === 0) {
      return res.status(404).json({ error: 'Medication data not found for the user' });
    }

    res.json(medicationResult.rows);
  } catch (error) {
    console.error('Error fetching medication data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;