import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./transactionHistory.css";

const TransactionHistory = () => {
  const name = sessionStorage.getItem("Name");
  const firstName = name.match(/^\S+/)[0];
  const balance = sessionStorage.getItem("amount");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    console.log("fetching transaction history data");
    const fetchBranchData = async () => {
      try {
        const branchId = sessionStorage.getItem("BranchId");
        const response = await fetch(`/branch-info?branch_id=${branchId}`);
        const data = await response.json();
        setTransactions(data.transactions);
        
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
            <h1 className="message-text">{name}'s Transaction History</h1>
            <div className="balance-container">
            <p className="balance">${balance}</p>
              <p className="balance-text">Current Balance</p>
            </div>
          </div>
          <div className="transaction-container">
            <h2  className="transaction-heading">Your Transactions</h2>
            <ul
              className="transaction-list"
              style={{ overflowY: "scroll", height: "308px" }}
            >
              {transactions.filter(transaction => transaction.transactions.includes(firstName))
                           .map((transaction, index) => (
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

export default TransactionHistory;