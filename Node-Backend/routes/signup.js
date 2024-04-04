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
      branchnum,
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
      'SELECT email FROM customerlogindata WHERE email = $1';
    const existingUser = await db.query(checkEmailQuery, [email]);

    if (existingUser.rows.length !== 0) {
      const errorMessage = 'Email already exists';
      return res.status(401).json({ error: errorMessage });
    }

    let newUser;
    let userId;


    const insertUserQuery = 'INSERT INTO customerlogindata (branchid, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING userid';
    const userValues = [branchnum, firstName, lastName, email.toLowerCase(), password];

    

    try {
        // Execute the query
        const res = await db.query(insertUserQuery, userValues);
        
        // Access the UserId of the newly inserted record
        userId = res.rows[0].userid;

        const insertMoneyQuery2 = 'INSERT INTO usermoney (amount, userid) VALUES ($1, $2)';
        const moneyValues = ["500", userId];

        const res2 = await db.query(insertMoneyQuery2, moneyValues);
        
        console.log("New user ID:", userId);
    } catch (err) {
        console.error("Error inserting new user:", err);
    }

    res.status(201).json({
      user: { user_id: userId, email: email },
      branchNum: branchnum,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;