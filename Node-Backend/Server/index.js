const express = require("express");
const bodyParser = require("body-parser");
const signupRoute = require("../routes/signup");
const loginRoute = require("../routes/login");
const profileRoute = require("../routes/profile");
const getusersRoute = require("../routes/gettingusers");
const transferRoute = require("../routes/transfer");
const branchInfoRoute = require("../routes/branch-info");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/getusers", getusersRoute); 
app.use("/sendtransfer", transferRoute); 
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/profile", profileRoute);
app.use("/branch-info", branchInfoRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
