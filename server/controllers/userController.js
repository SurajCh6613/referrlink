const generateToken = require("../middlewares/generateToken");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  let { name, email, password, role, college, skills } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(401).json({ message: "Required field must be filled." });
  }
  skills = skills.split(",").map((skill) => skill.trim());
  console.log(skills);
  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({
      message: "User already exist",
    });
  }
  //   Hashing Password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    college,
    skills,
  });
  // Generating token
  await newUser.save();
  const token = generateToken(newUser._id);
  res.cookie("token", token);
  res.json({ user: newUser });
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(401).json({ message: "Required field must be filled." });
  }
  const user = await User.findOne({ email: email, role: role });
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  //   Comparing Password
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
  const token = generateToken(user._id);
  res.cookie("token", token);
  res.status(201).json({ message: "User Logged In " });
};

const logoutUser = async (req, res) => {
  res.cookie("token", "");
  res.json({ message: "Logout Successfully" });
};

const getUser = async (req, res) => {
  const user = req.user;
  return res.status(200).json({ user });
};

const editUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      name,
      email,
      password: hashedPassword,
      role,
    }
  );
  await updatedUser.save();
  res.json({ updatedUser });
};

module.exports = { registerUser, loginUser, getUser, editUser, logoutUser };
