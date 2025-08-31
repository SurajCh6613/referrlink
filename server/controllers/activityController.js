const Activity = require("../models/activitySchema");
const logger = require("../Logger/logger");

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ seniorId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json({ activities });
  } catch (error) {
    res.json({ message: error || "Getting Activities Error" });
    logger.error({ message: error || "Getting Activities Error" });
  }
};

const postActivity = async (req, res) => {
  try {
    const { user, company, role, action } = req.body;
    if (!user || !company || !role || !action) {
      return res.status(400).json({ message: "Data Missing" });
    }
    const newActivity = new Activity({
      seniorId: req.user._id,
      user,
      company,
      role,
      action,
    });
    await newActivity.save();
    res.status(200).json({ newActivity });
  } catch (error) {
    res.json({ message: error || "Posting Activity Error" });
    logger.error({ message: error || "Posting Activities Error" });
  }
};

module.exports = { getActivities, postActivity };
