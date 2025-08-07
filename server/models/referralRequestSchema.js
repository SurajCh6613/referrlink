const mongoose = require("mongoose");

const referralRequestSchema = mongoose.Schema(
  {
    junior: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senior: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: String,
    company: String,
    jobRole: String,
    resumeUrl: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReferralRequest", referralRequestSchema);
