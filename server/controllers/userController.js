const { log, profile } = require("winston");
const logger = require("../Logger/logger");
const generateToken = require("../middlewares/generateToken");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    let { firstname, lastname, email, password, role } = req.body;
    if (!firstname || !lastname || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatar = `${firstname[0]}${lastname[0]}`.toUpperCase();

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
      avatar,
    });

    await newUser.save();

    const token = generateToken(newUser._id);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.log(error);

    logger.error("Register Error:", error.message);
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
    logger.error("Login Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "");
    res.json({ message: "Logout Successfully" });
  } catch (error) {
    logger.error("Logout Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    logger.error("Get User Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let {
      firstname,
      lastname,
      headline,
      about,
      experience,
      education,
      skills,
      resumeUrl,
      linkedInUrl,
      githubUrl,
      city,
      country,
    } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const updateFields = {};
    firstname !== undefined ? (updateFields.firstname = firstname) : "";
    lastname !== undefined ? (updateFields.lastname = lastname) : "";

    const avatar = `${firstname ? firstname[0] : user.firstname[0]}${
      lastname ? lastname[0] : user.lastname[0]
    }`.toUpperCase();
    updateFields.avatar = avatar;

    // Update profile sub-fields
    headline !== undefined
      ? (updateFields["profile.headline"] = headline)
      : user.profile.headline;
    about !== undefined
      ? (updateFields["profile.about"] = about)
      : user?.profile.about;

    // Experience Updation
    if (experience !== undefined) {
      const oldExperience = user?.profile?.experience || [];

      // Check for valid experience, Add new entry only if it’s valid
      if (
        experience.title &&
        experience.company &&
        experience.duration &&
        experience.description
      ) {
        updateFields["profile.experience"] = [...oldExperience, experience];
      }
    }

    // Education updation
    if (education !== undefined) {
      const oldEducation = user?.profile?.education || [];

      // Check for valid experience, Add new entry only if it’s valid
      if (education.degree && education.institution && education.year) {
        updateFields["profile.education"] = [...oldEducation, education];
      }
    }

    // Skills Updation
    const newSkills = skills?.split(",").map((skill) => skill.trim());
    const skillSet = new Set([...(user?.profile?.skills || []), ...newSkills]);
    updateFields["profile.skills"] = Array.from(skillSet);

    // Location Updation
    if (city !== undefined) updateFields["profile.location.city"] = city;
    if (country !== undefined) updateFields["profile.location.country"] = country;

    // Resume Updation
    if (resumeUrl !== undefined) updateFields["profile.resumeUrl"] = resumeUrl;
    // Linkedin URL Updation
    if (linkedInUrl !== undefined)
      updateFields["profile.linkedInUrl"] = linkedInUrl;
    // Github URL Updation
    if (githubUrl !== undefined) updateFields["profile.githubUrl"] = githubUrl;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    );

    if (!updateUser) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.status(201).json({ user: updatedUser });
  } catch (error) {
    logger.error("Update user error:", error);
    res.json("Update user error:", error);
  }
};

module.exports = { registerUser, loginUser, getUser, updateUser, logoutUser };
