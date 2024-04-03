const express = require('express');
const router = express.Router();
const db = require('../db'); 
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if a patient with the same email and password exists
    const checkEmailQuery = 'SELECT * FROM customerlogindata WHERE email = $1 AND password = $2';
    const queryresult = await db.query(checkEmailQuery, [email, password]);

    if (queryresult.rows.length == 0) {
        const errorMessage = 'Incorrect Email or password';
        return res.status(400).res.json({ error: errorMessage });
    }
    else{
          console.log("correct pass");
          const jwtToken =  jwt.sign({
            id: queryresult.rows[0].userid,
            email: queryresult.rows[0].email,
          }, process.env.JWTTOK, {expiresIn: "120",});
          const FName = queryresult.rows[0].firstname;
          const LName = queryresult.rows[0].lastname;
          const datatosend = {
            id: queryresult.rows[0].userid,
            email: queryresult.rows[0].email,
            Name:  FName + " " +LName,
            token: jwtToken
          };
          return res.json({datatosend});

    }
    
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: 'Server Error' });
  }
});

module.exports = router;