import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./BranchHome.css";

const BranchHome = () => {
  const name = sessionStorage.getItem("Name");
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const branchId = sessionStorage.getItem("BranchId");
        const response = await fetch(`/branch-info?branch_id=${branchId}`);
        const data = await response.json();
        setTransactions(data.transactions);
        setAmount(data.amount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBranchData();
  }, []);

  return (
    <Grid container spacing={8} className="pharma-container">
      <Grid item lg={5} className="content">
        <div className="bank-details-container">
          <div className="text-container">
            <h1 className="message-text">Welcome back, {name}!</h1>
            <div className="balance-container">
              <p className="balance">${amount}</p>
              <p className="balance-text">Total Branch Balance</p>
            </div>
          </div>
          <div className="transaction-container">
            <h2 className="transaction-heading">Recent Branch Transactions</h2>
            <ul
              className="transaction-list"
              style={{ overflowY: "scroll", height: "308px" }}
            >
              {transactions.map((transaction, index) => (
                <li key={index} className="transaction-item">
                  {/* Render transaction details here */}
                  <p className="transaction-amount">
                    {transaction.transactions}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Grid>
      <Grid item lg={7} className="image-container">
        <Paper elevation={1} className="image" />
      </Grid>
    </Grid>
  );
};

export default BranchHome;
