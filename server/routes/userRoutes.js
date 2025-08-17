const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUsers,
  getSeniors,
  allUsers,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth, allUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getUser);
router.get("/seniors", auth, getSeniors);
router.get("/logout", auth, logoutUser);
router.patch("/", auth, updateUser);
router.delete("/", auth, deleteUser);

module.exports = router;
