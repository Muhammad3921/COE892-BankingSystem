import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './PharmaceuticalPortal.css';

const PharmaceuticalPortal = () => {
  return (
    <Grid container spacing={8} className='pharma-container'>
      <Grid item lg={5} className='content'>
          <div className='text-container'>
            <h1 className="message-text">Discover a community that supports you in your pharmaceutical journey.</h1>
            <p className="slogan-text">Connect. Share. Learn Together.</p>         
          </div>
          <Button component={Link} to="/signup" id='getHelpButton'>
            Get Help Today
          </Button>
      </Grid>
      <Grid item lg={7} className='image-container'>
        <Paper elevation={1} className='image'/>
      </Grid>
    </Grid>
  );
}

export default PharmaceuticalPortal;
