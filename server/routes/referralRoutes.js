const express = require("express");
const {
  requestReferral,
  sentReferrals,
  recievedRequests,
  referralResponse,
} = require("../controllers/referralController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/request/:id", auth, requestReferral);
router.get("/sent", auth, sentReferrals);
router.get("/", auth, recievedRequests);
router.patch("/:id", auth, referralResponse);

module.exports = router;
