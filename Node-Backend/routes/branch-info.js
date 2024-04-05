const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const branch_id = req.query.branch_id;

  if (!branch_id) {
    return res.status(400).json({ error: "Missing branch_id" });
  }

  try {
    let transactions;
    let amount;

    transactions = await db.query(
      `SELECT transactions FROM branch${branch_id}data`
    );
    amount = await db.query(
      "SELECT amount FROM branchlogindata WHERE branchid = $1",
      [branch_id]
    );

    data = {
      transactions: transactions.rows,
      amount: amount.rows[0].amount,
    };

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
