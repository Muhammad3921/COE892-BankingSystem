import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  //const storedUserId = sessionStorage.getItem('userId');
  //console.log(storedUserId);
  const balance = sessionStorage.getItem("amount");
  const name = sessionStorage.getItem("Name");

  return (
    <Grid container spacing={8} className="pharma-container">
      <Grid item lg={5} className="content">
        <div className="bank-details-container">
          <div className="text-container">
            <h1 className="message-text">Welcome back, {name}!</h1>
            <div className="balance-container">
              <p className="balance">${balance}</p>
              <p className="balance-text">Current Balance</p>
            </div>
          </div>
          <div className="button-container">
            <Button component={Link} to="/signup" id="getHelpButton">
              E-Transfer
            </Button>
            <Button component={Link} to="/transactionHistory" id="getHelpButton">
              View Transaction History
            </Button>
            <Button component={Link} to="/signup" id="getHelpButton">
              Get Help Today
            </Button>
          </div>
        </div>
      </Grid>
      <Grid item lg={7} className="image-container">
        <Paper elevation={1} className="image" />
      </Grid>
    </Grid>
  );
};

export default Home;
