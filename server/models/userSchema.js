const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["junior", "senior"],
    default: "junior",
  },
  college: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
