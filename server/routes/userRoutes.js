const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  editUser,
  logoutUser,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getUser);
router.get("/logout", auth, logoutUser);
router.patch("/edit/:id", auth, editUser);

module.exports = router;
