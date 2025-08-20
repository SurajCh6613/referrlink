const { error } = require("winston");
const ReferralRequest = require("../models/referralRequestSchema");
const User = require("../models/userSchema");
const referralRequestSchema = require("../models/referralRequestSchema");
const logger = require("../Logger/logger");

const requestReferral = async (req, res) => {
  try {
    console.log(req.user._id);
    const { message, status, company, jobRole, resumeUrl } = req.body;
    if (!company) {
      return res.status(401).json({ message: "Company required" });
    }
    if (!jobRole) {
      return res.status(401).json({ message: "Job Role required" });
    }
    if (!resumeUrl) {
      return res.status(401).json({ message: "Resume url required" });
    }
    if (!message) {
      return res.status(401).json({ message: "message required" });
    }
    const senior = await User.findById(req.params.id);
    // If junior already sent request to senior
    const existingRequest = await ReferralRequest.findOne({
      senderId: senior._id,
      recieverId: req.user._id,
    });
    if (existingRequest) {
      return res.status(401).json({ message: "Request already sent" });
    }
    // Check if junior tried to request referral to self
    if (senior._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Senior and junior same" });
    }
    if (!senior || senior.role !== "senior") {
      return res.status(400).json({ message: "Invalid senior user" });
    }
    const newReferralRequest = await new ReferralRequest({
      senderId: req.user._id,
      recieverId: senior._id,
      message,
      company,
      jobRole,
      resumeUrl,
      status,
    });
    await newReferralRequest.save();
    res.json({
      referral: newReferralRequest,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

const sentReferrals = async (req, res) => {
  try {
    const requests =
      req.user.role === "junior"
        ? await referralRequestSchema.find({
            senderId: req.user._id,
          })
        : await referralRequestSchema.find({
            recieverId: req.user._id,
          });
    if (!requests) {
      return res.status(200).json({ message: "No request found" });
    }
    return res.status(200).json({ referralRequests: requests });
  } catch (error) {
    logger.error({ error: error });
    return res.status(400).json({ message: "Soething went wrong" });
  }
};

const recievedRequests = async (req, res) => {
  try {
    const requests = await referralRequestSchema.find({
      recieverId: req.user._id,
    });
    if (!requests) {
      return res.status(200).json({ message: "No request found" });
    }
    return res.status(200).json({ referralRequests: requests });
  } catch (error) {
    logger.error({ error: error });
    return res.status(400).json({ message: "Bad request" });
  }
};

const referralResponse = async (req, res) => {
  try {
    if (req.user.role !== "senior") {
      return res.status(401).json({ message: "Unauthroized request" });
    }
    const { status, responseMessage } = req.body;
    if (!status) {
      return res.status(401).json({ message: "Status required" });
    }
    const updatedReferral = await referralRequestSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status,
          responseMessage: responseMessage || "",
        },
      },
      { new: true }
    );
    return res.status(201).json({ updatedReferral });
  } catch (error) {
    logger.error({ error });
    return res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  requestReferral,
  sentReferrals,
  recievedRequests,
  referralResponse,
};
