const express = require("express");
const {
  getActivities,
  postActivity,
} = require("../controllers/activityController");
const router = express.Router();

const auth = require("../middlewares/auth");

router.get("/", auth, getActivities);
router.post("/", auth, postActivity);

module.exports = router;
