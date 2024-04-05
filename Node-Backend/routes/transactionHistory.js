const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const branch_id = req.query.branch_id;
  // const firstName = req.query.transactionHistory; 

  if (!branch_id || !firstName) {
    return res.status(400).json({ error: "Missing branch_id or transactionHistory" });
  }

  try {
    const query = `SELECT * FROM branch${branch_id}data `;
    // const transactions = await db.query(query, [`%${firstName}%`]);

    if (transactions.rows.length) {
      res.status(200).json(transactions.rows);
    } else {
      res.status(404).json({ error: "No matching transactions found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
