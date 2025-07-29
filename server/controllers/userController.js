const generateToken = require("../middlewares/generateToken");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    let { name, email, password, role, college, skills } = req.body;
    if (!name || !email || !password || !role || !college || !skills) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Skills parsing
    skills = skills ? skills.split(",").map((skill) => skill.trim()) : [];

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      college,
      skills,
    });

    await newUser.save();

    const token = generateToken(newUser._id);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(401)
        .json({ message: "Required field must be filled." });
    }
    const user = await User.findOne({ email: email, role: role });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    //   Comparing Password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = generateToken(user._id);
    res.cookie("token", token);
    res.status(201).json({ user: user });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "");
    res.json({ message: "Logout Successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Get User Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const editUser = async (req, res) => {
  try {
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
    res.status(201).json({ user: updatedUser });
  } catch (error) {
    console.error("Edit User Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser, getUser, editUser, logoutUser };
