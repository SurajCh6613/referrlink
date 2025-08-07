const ReferralRequest = require("../models/referralRequestSchema");
const User = require("../models/userSchema");

const requestReferral = async (req, res) => {
  try {
    const { message, status, company, jobRole, resumeUrl } = req.body;
    if (!message || !jobRole || !resumeUrl || !company) {
      return res.status(401).json({ message: "all fields are required" });
    }
    const senior = await User.findById(req.params.id);
    if (!senior || senior.role !== "senior") {
      return res.status(400).json({ message: "Invalid senior user" });
    }
    const newReferralRequest = await new ReferralRequest({
      senior: senior._id,
      junior: req.user._id,
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
    res.json({ error: error });
  }
};

const sentReferrals = async (req, res) => {
  try {
    console.log(req.user._id);
    const referrals = await ReferralRequest.find({ senior: req.user._id });
    console.log(referrals);
  } catch (error) {}
};

module.exports = { requestReferral, sentReferrals };
