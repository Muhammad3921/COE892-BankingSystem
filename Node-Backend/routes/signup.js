const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      homeAddress,
      dateOfBirth,
      phone,
      email,
      userType,
      licenseNumber,
      password,
      hiredDate
    } = req.body;

    // Check if a user with the same email already exists
    const checkEmailQuery =
      'SELECT email FROM users WHERE email = $1';
    const existingUser = await db.query(checkEmailQuery, [email]);

    if (existingUser.rows.length !== 0) {
      const errorMessage = 'Email already exists';
      return res.status(401).json({ error: errorMessage });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUser;
    let userId;

    if (userType === 'Patient') {
      // Generate user_id for patient
      const patientCountQuery = 'SELECT COUNT(*) FROM patient';
      const patientCountResult = await db.query(patientCountQuery);
      const patientCount = parseInt(patientCountResult.rows[0].count, 10) + 1;
      userId = 'c' + patientCount;

      // Insert the new user into the users table
      const insertUserQuery =
        'INSERT INTO users (user_id, email, password) VALUES ($1, $2, $3) RETURNING user_id';
      const userValues = [userId, email, hashedPassword];
      newUser = await db.query(insertUserQuery, userValues);

      // Insert the new patient into the patient table
      const insertPatientQuery =
        'INSERT INTO patient (user_id, first_name, last_name, gender, address, date_of_birth, phone_number, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
      const patientValues = [userId, firstName, lastName, gender, homeAddress, dateOfBirth, phone, email];
      await db.query(insertPatientQuery, patientValues);

    } else if (userType === 'Pharmacist') {
      // Generate user_id for pharmacist
      const pharmacistCountQuery = 'SELECT COUNT(*) FROM pharmacist';
      const pharmacistCountResult = await db.query(pharmacistCountQuery);
      const pharmacistCount = parseInt(pharmacistCountResult.rows[0].count, 10) + 1;
      userId = 'p' + pharmacistCount;

      // Insert the new user into the users table
      const insertUserQuery =
        'INSERT INTO users (user_id, email, password) VALUES ($1, $2, $3) RETURNING user_id';
      const userValues = [userId, email, hashedPassword];
      newUser = await db.query(insertUserQuery, userValues);

      // Insert the new pharmacist into the pharmacist table
      const insertPharmacistQuery =
        'INSERT INTO pharmacist (user_id, first_name, last_name, gender, license_number, email, phone_number, date_of_birth, hire_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
      const pharmacistValues = [userId, firstName, lastName, gender, licenseNumber, email, phone, dateOfBirth, hiredDate];
      await db.query(insertPharmacistQuery, pharmacistValues);

    } else {
      // Handle invalid userType
      return res.status(400).json({ error: 'Invalid user type' });
    }

    res.status(201).json({
      user: { user_id: userId, email: email },
      userType: userType,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;