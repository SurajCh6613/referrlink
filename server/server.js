require('dotenv').config()
const express = require("express");
const ConnectDB = require("./config/ConnectDB");
const app = express();
const PORT = process.env.PORT || 3000;
ConnectDB()

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
