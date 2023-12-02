const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./utils/errorHandler");

// <-- Middleware -->
app.use(cors());
app.use("/api/v1/course-enroll/stripe/webhook", express.raw({ type: "*/*" })); // Stripe webhook
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use("/api/v1/", express.static("public"));

// <-- Routes -->
app.get("/api/v1", (req, res) => {
  res.send("Route is working!");
});

app.use("/api/v1/user", require("./routes/v1/userRoute"));
app.use("/api/v1/profile", require("./routes/v1/profileRoute"));
app.use("/api/v1/course", require("./routes/v1/courseRoute"));
app.use("/api/v1/course-enroll", require("./routes/v1/courseEnrollRoute"));
app.use("/api/v1/assignment", require("./routes/v1/assignmentRoute"));
app.use("/api/v1/certificate", require("./routes/v1/certificateRoute"));
app.use("/api/v1/coupon-code", require("./routes/v1/couponCodeRoute"));
app.use(
  "/api/v1/book-counselling",
  require("./routes/v1/bookCounsellingRoute")
);
//
app.use("/api/v1/reward", require("./routes/v1/rewardRoute"));
//
app.all("*", (req, res) => {
  res.send("No Route found.");
});

// <-- Global error handler -->
app.use(errorHandler);

module.exports = app;
