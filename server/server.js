require("dotenv").config();
const express = require("express");
const ConnectDB = require("./config/ConnectDB");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;
ConnectDB();

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
