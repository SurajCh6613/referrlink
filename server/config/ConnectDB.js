const mongoose = require("mongoose");
const logger = require("../Logger/logger");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected successfully");
  } catch (error) {
    console.error(`DB Connection error ${error}`);
    logger.error("DB Connection Error");
    process.exit(1);
  }
};

module.exports = ConnectDB;
