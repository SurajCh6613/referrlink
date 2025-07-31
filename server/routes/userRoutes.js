const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getUser);
router.get("/logout", auth, logoutUser);
router.patch("/update/:id", auth, updateUser);

module.exports = router;
