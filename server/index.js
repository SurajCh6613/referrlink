require("dotenv").config();
const express = require("express");
const ConnectDB = require("./config/ConnectDB");
const userRoutes = require("./routes/userRoutes");
const referralRoutes = require("./routes/referralRoutes");
const activityRoutes = require("./routes/activityRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
ConnectDB();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/activity", activityRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ReferrLink server");
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
