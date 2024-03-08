const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('../db'); 
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {

    try {
      const email_data = req.body;
      console.log("here");
      console.log(client);
        
      // Check if a patient with the same email and password exists
      const checkEmailQuery = 'SELECT * FROM users WHERE user_id = $1';
      const queryresult = await db.query(checkEmailQuery, [email_data.userId]);
      
 

      
      const PidQue = 'SELECT patient_id, first_name, last_name FROM patient WHERE user_id = $1';
      const PidQueresult = await db.query(PidQue, [email_data.userId]);
 
      const MedQue = 'SELECT title, drug_strength, dosage, start_recur, end_recur, duration FROM patientmedication WHERE patient_id = $1';
      const MedQueresult = await db.query(MedQue, [email_data.userId]);
      console.log(MedQueresult.rows[0]);
      var msg1 = "Hello,\n" +PidQueresult.rows[0].first_name + " " +PidQueresult.rows[0].last_name + ".\nYour medication for today is:";
      var msg2 = "";
      var flag = 0;
      var start_date = "";
      var end_date = "";

      for (let i = 0; i < MedQueresult.rows.length; i++) {
        start_date = formatDateString(MedQueresult.rows[i].start_recur);
        end_date = formatDateString(MedQueresult.rows[i].end_recur);
        if(!isTodayBetweenDates(start_date, end_date)){
       
          
        }else{
        flag++;
        const datatosend = {
            title: MedQueresult.rows[i].title,
            drugstrength: MedQueresult.rows[i].drug_strength,
            dosage:  MedQueresult.rows[i].dosage,
            duration: MedQueresult.rows[i].duration,
          
          };
          msg2 = msg2 + "\n" +datatosend.title +" Strength: "+datatosend.drugstrength + " Dosage: " +datatosend.dosage;
          
        }
        
      }
      console.log(flag);
      if(flag != 0){ 
      sendTextMessage(msg1 + msg2);
      sendEmail(queryresult.rows[0].email, 'Prescriptions', msg1 + msg2);
      return res.status(200);
      }
            
      return res.status(400);
       
      
      
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ error: 'Server Error' });
    }
  
    function sendTextMessage(msg){
        client.messages.create({
            body: msg,
            to: '+16479396641',
            from: '+12015814244'
        }).then(message => console.log(message))
        // implement fallback code
        .catch(error => console.log(error))
    }

    function formatDateString(inputDateString) {
      const inputDate = new Date(inputDateString);
      
      // Check if the inputDate is a valid date
      if (isNaN(inputDate.getTime())) {
          // If the input date is not valid, return an error message or handle accordingly
          return 'Invalid date';
      }
  
      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1
      const day = inputDate.getDate().toString().padStart(2, '0');
  
      // Format the date as "YYYY-MM-DD"
      const formattedDate = `${year}-${month}-${day}`;
  
      return formattedDate;
  }
    function isTodayBetweenDates(start_date, end_date) {
      // Get today's date
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1; // Month is zero-based, so we add 1
      const day = today.getDate();
  
      // Format today's date as "YYYY-MM-DD"
      const formattedToday = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      console.log(formattedToday);
  
      // Compare today's date with the start_date and end_date
      return formattedToday >= start_date && formattedToday <= end_date;
  }


  async function sendEmail(to, subject, text) {
    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'apnahasnain@gmail.com', // Replace with your Gmail address
            pass: 'jdem ykgz iddu pytr' // Replace with your app-specific password
        }
    });

    // Set email options
    let mailOptions = {
        from: 'apnahasnain@gmail.com', // Replace with your Gmail address
        to: to, // Recipient email
        subject: subject, // Email subject
        text: text, // Email body text
    };

    // Send email
    try {
      console.log('Message sent1: ');
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
    }

    });

  module.exports = router;