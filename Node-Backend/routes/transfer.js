const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
      const {
        from,
        to,
        amount,
        branchid
      } = req.body;

      // Start transaction
      await db.query('BEGIN');
  
      // Check if the sender has enough money
      const senderAmountResult = await db.query('SELECT amount FROM usermoney WHERE userid = $1', [from]);

      if (senderAmountResult.rows.length === 0) {
        return res.status(400).json({ error1: 'Sender does not exist.' });
      }

      const senderAmount = parseFloat(senderAmountResult.rows[0].amount);
      if (parseFloat(amount) > senderAmount) {
        return res.status(400).json({ error1: 'Insufficient funds.' });
      }

      // Get the recipient's user ID based on their fullname
      const [firstName, lastName] = to.split(' '); // Assuming full name is split by space
      const recipientResult = await db.query('SELECT userid FROM customerlogindata WHERE firstname = $1 AND lastname = $2', [firstName, lastName]);

      if (recipientResult.rows.length === 0) {
        return res.status(400).json({ error1: 'Recipient does not exist.' });
      }
  
      const recipientId = recipientResult.rows[0].userid;
  
      // Subtract the amount from the sender
      await db.query('UPDATE usermoney SET amount = amount - $1 WHERE userid = $2', [amount, from]);
  
      // Add the amount to the recipient
      await db.query('UPDATE usermoney SET amount = amount + $1 WHERE userid = $2', [amount, recipientId]);
  
      // Commit transaction
      await db.query('COMMIT');
  
      // Get the new amount for the sender to return to the frontend
      const newSenderAmountResult = await db.query('SELECT amount FROM usermoney WHERE userid = $1', [from]);
      const newSenderAmount = newSenderAmountResult.rows[0].amount;
  
      res.json({ newAmount: newSenderAmount });
  
    } catch (error) {
      // If any of the above operations fail, rollback the transaction
      await db.query('ROLLBACK');
      res.status(400).json({ error1: error.message });
    }
  //   // Check if a user with the same email already exists
  //   const checkEmailQuery =
  //     'SELECT email FROM customerlogindata WHERE email = $1';
  //   const existingUser = await db.query(checkEmailQuery, [email]);

  //   if (existingUser.rows.length !== 0) {
  //     const errorMessage = 'Email already exists';
  //     return res.status(401).json({ error: errorMessage });
  //   }

  //   let newUser;
  //   let userId;


  //   const insertUserQuery = 'INSERT INTO customerlogindata (branchid, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING userid';
  //   const userValues = [branchnum, firstName, lastName, email.toLowerCase(), password];

    

  //   try {
  //       // Execute the query
  //       const res = await db.query(insertUserQuery, userValues);
        
  //       // Access the UserId of the newly inserted record
  //       userId = res.rows[0].userid;

  //       const insertMoneyQuery2 = 'INSERT INTO usermoney (amount, userid) VALUES ($1, $2)';
  //       const moneyValues = ["500", userId];

  //       const res2 = await db.query(insertMoneyQuery2, moneyValues);
        
  //       console.log("New user ID:", userId);
  //   } catch (err) {
  //       console.error("Error inserting new user:", err);
  //   }

  //   res.status(201).json({
  //     user: { user_id: userId, email: email },
  //     branchNum: branchnum,
  //   });
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).json({ error: 'Server Error' });
  // }
});

module.exports = router;