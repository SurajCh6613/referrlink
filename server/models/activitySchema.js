const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    seniorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user: {
      type: String, // e.g. "Rahul Joshi"
      required: true,
    },
    company: String,
    role: String,
    action: {
      type: String,
      enum: ["accepted", "rejected"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
