require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

// database connection
mongoose.connect(process.env.DB_LOCAL_URL).then(() => {
  console.log(`Database is connected.`);
});

// server
const port = process.env.PORT || 5600;

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});

//
//
