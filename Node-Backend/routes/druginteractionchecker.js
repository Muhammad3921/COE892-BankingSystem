const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {

  try {
    const medicationResult = await db.query('SELECT row_number() over() id, drug_name FROM medication ORDER BY drug_name ASC');

    if (medicationResult.rows.length === 0) {
      return res.status(404).json({ error: 'Medications not found' });
    }
    
    res.json(medicationResult.rows);
  } catch (error) {
    console.error('Error fetching medication data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:medicine', async (req, res) => {

  const { medicine } = req.params;

  try {
    const conflictingDrugResult = await db.query('SELECT drug_name, conflicting_drug FROM medication WHERE drug_name = $1', [medicine]);

    if (conflictingDrugResult.rows.length === 0) {
      return res.status(404).json({ error: 'Medications not found' });
    }
    
    res.json(conflictingDrugResult.rows);
  } catch (error) {
    console.error('Error fetching medication data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;