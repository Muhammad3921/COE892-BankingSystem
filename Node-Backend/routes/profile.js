const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    let result;

    if (user_id.startsWith('c')) {
      result = await db.query('SELECT * FROM patient WHERE user_id = $1', [user_id]);
    } else if (user_id.startsWith('p')) {
      result = await db.query('SELECT * FROM pharmacist WHERE user_id = $1', [user_id]);
    } else {
      return res.status(404).json({ error: 'Invalid user_id' });
    }

    const userProfile = result.rows[0];

    if (userProfile) {
      res.json(userProfile);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const updatedProfile = req.body;

  try {
    let query;
    let queryParams;

    if (user_id.startsWith('c')) {
      const patientEmailExists = await db.query('SELECT user_id FROM users WHERE email = $1 AND user_id != $2', [updatedProfile.email, user_id]);
      if (patientEmailExists.rows.length > 0) {
        const errorMessage = 'Email already exists';
        return res.status(401).json({ error: errorMessage });
      }

      query = 'UPDATE patient SET first_name=$1, last_name=$2, gender=$3, address=$4, date_of_birth=$5, phone_number=$6, email=$7 WHERE user_id=$8';
      queryParams = [
        updatedProfile.first_name,
        updatedProfile.last_name,
        updatedProfile.gender,
        updatedProfile.address,
        updatedProfile.date_of_birth,
        updatedProfile.phone_number,
        updatedProfile.email,
        user_id
      ];

      const updateUserEmailQuery = 'UPDATE users SET email=$1 WHERE user_id=$2';
      const updateUserEmailParams = [updatedProfile.email, user_id];
      await db.query(updateUserEmailQuery, updateUserEmailParams);
    } else if (user_id.startsWith('p')) {
      const pharmacistEmailExists = await db.query('SELECT user_id FROM users WHERE email = $1 AND user_id != $2', [updatedProfile.email, user_id]);
      if (pharmacistEmailExists.rows.length > 0) {
        const errorMessage = 'Email already exists';
        return res.status(401).json({ error: errorMessage });
      }

      query = 'UPDATE pharmacist SET first_name=$1, last_name=$2, gender=$3, date_of_birth=$4, email=$5, phone_number=$6, license_number=$7, hire_date=$8 WHERE user_id=$9';
      queryParams = [
        updatedProfile.first_name,
        updatedProfile.last_name,
        updatedProfile.gender,
        updatedProfile.date_of_birth,
        updatedProfile.email,
        updatedProfile.phone_number,
        updatedProfile.license_number,
        updatedProfile.hire_date,
        user_id
      ];

      const updateUserEmailQuery = 'UPDATE users SET email=$1 WHERE user_id=$2';
      const updateUserEmailParams = [updatedProfile.email, user_id];
      await db.query(updateUserEmailQuery, updateUserEmailParams);
    } else {
      return res.status(404).json({ error: 'Invalid user_id' });
    }

    await db.query(query, queryParams);

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;