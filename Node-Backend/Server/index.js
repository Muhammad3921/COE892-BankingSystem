const express = require("express");
const bodyParser = require("body-parser");
const signupRoute = require("../routes/signup"); 
const loginRoute = require("../routes/login"); 
const schedulerRoute = require("../routes/scheduler");
const profileRoute = require("../routes/profile");
const drugSupplyTrackerRoute = require("../routes/drugSupplyTracker");
const drugInteractionCheckerRoute = require("../routes/druginteractionchecker");
const medicationsRoute = require('../routes/medications');
const notifRoute = require("../routes/notification");
const drugSideEffectReport = require("../routes/drugsideeffectreport");

const app = express();

require('dotenv').config();

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/api/scheduler", schedulerRoute);
app.use("/api/medications", medicationsRoute);
app.use("/profile", profileRoute); 
app.use("/drug_supply_tracker", drugSupplyTrackerRoute);
app.use("/drug_interaction_checker", drugInteractionCheckerRoute);
app.use("/noti", notifRoute); 
app.use("/side-effect-report", drugSideEffectReport);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

function sendTextMessage(msg){
  client.messages.create({
      body: msg,
      to: '+16479396641',
      from: '+12015814244'
  }).then(message => console.log(message))
  // implement fallback code
  .catch(error => console.log(error))
}
