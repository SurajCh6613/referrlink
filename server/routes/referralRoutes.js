const express = require("express");
const {
  requestReferral,
  sentReferrals,
  recievedRequests,
  referralResponse,
  getAverageResponseTime,
} = require("../controllers/referralController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth, recievedRequests);
router.get("/sent", auth, sentReferrals);
router.get("/avg-response-time", auth, getAverageResponseTime);
router.post("/request/:id", auth, requestReferral);
router.patch("/:id", auth, referralResponse);

module.exports = router;
