const express = require("express");
const {
  requestReferral,
  sentReferrals,
} = require("../controllers/referralController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/request/:id", auth, requestReferral);
router.get("/sent", sentReferrals);

module.exports = router;
