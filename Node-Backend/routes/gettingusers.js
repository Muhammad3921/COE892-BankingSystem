const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  
  const userid = req.query;
  console.log(userid.name)
  result = await db.query('SELECT firstname || \' \' || lastname AS fullname FROM customerlogindata WHERE userid != $1', [userid.name]);

  
  if (result.rows.length == 0) {
    const errorMessage = 'No Users exist';
    return res.status(401).json({ error: errorMessage });
  }else{
    console.log(result.rows)
    return res.status(200).json(result.rows);

  }

  
});

module.exports = router;