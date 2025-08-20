const mongoose = require("mongoose");

const referralRequestSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobRole: { type: String, required: true },
    company: { type: String, required: true },
    message: { type: String },
    resumeUrl: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    responseMessage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReferralRequest", referralRequestSchema);
