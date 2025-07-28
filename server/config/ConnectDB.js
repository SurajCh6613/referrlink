const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("DB Connected successfully");
  } catch (error) {
    console.error(`DB Connection error ${error}`);
  }
};

module.exports = ConnectDB;
