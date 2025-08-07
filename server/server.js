require("dotenv").config();
const express = require("express");
const ConnectDB = require("./config/ConnectDB");
const userRoutes = require("./routes/userRoutes");
const referralRoutes = require("./routes/referralRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
ConnectDB();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/referral", referralRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
