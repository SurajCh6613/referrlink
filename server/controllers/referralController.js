const { error } = require("winston");
const ReferralRequest = require("../models/referralRequestSchema");
const User = require("../models/userSchema");
const referralRequestSchema = require("../models/referralRequestSchema");
const logger = require("../Logger/logger");

const requestReferral = async (req, res) => {
  try {
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
    if (!senior || senior.role !== "senior") {
      return res.status(400).json({ message: "Invalid senior user" });
    }
    // Check if junior tried to request referral to self
    if (senior._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Senior and junior same" });
    }
    // If junior already sent request to senior
    const existingRequest = await ReferralRequest.findOne({
      senderId: senior._id,
      recieverId: req.user._id,
    });
    if (existingRequest) {
      return res.status(401).json({ message: "Request already sent" });
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
        ? await referralRequestSchema
            .find({
              senderId: req.user._id,
            })
            .sort({ updatedAt: -1 })
            .limit(10)
        : await referralRequestSchema
            .find({
              recieverId: req.user._id,
            })
            .sort({ updatedAt: -1 })
            .limit(10);
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
    const requests = await referralRequestSchema
      .find({
        recieverId: req.user._id,
      })
      .populate(
        "senderId",
        "firstname lastname experience.company experience.jobRole"
      );
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
          responsedAt: new Date(),
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

const getAverageResponseTime = async (req, res) => {
  try {
    const seniorId = req.user._id;
    // Fetching all responsed referral request
    const requests = await referralRequestSchema.find({
      recieverId: seniorId,
      status: { $in: ["accepted", "rejected"] },
      responsedAt: { $ne: null },
    });
    if (requests.length === 0) {
      return res.status(200).json({
        success: true,
        avgResponseTime: { minutes: 0, hours: 0, days: 0 },
      });
    }
    // Calculating response time
    let totalResponseTime = 0;
    requests.forEach(
      (req) => (totalResponseTime += req.responsedAt - req.createdAt)
    );

    // 3. Average
    const avgResponseTime = totalResponseTime / requests.length;

    // 4. Convert to readable format
    const minutes = Math.round(avgResponseTime / (1000 * 60));
    const hours = Math.round(avgResponseTime / (1000 * 60 * 60));
    const days = Math.round(avgResponseTime / (1000 * 60 * 60 * 24));

    return res.status(200).json({
      success: true,
      avgResponseTime: { minutes, hours, days },
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  requestReferral,
  sentReferrals,
  recievedRequests,
  referralResponse,
  getAverageResponseTime,
};
