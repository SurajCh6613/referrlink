const { log, profile } = require("winston");
const logger = require("../Logger/logger");
const generateToken = require("../middlewares/generateToken");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    let { firstname, lastname, email, password, role, company, jobRole } =
      req.body;
    if (!firstname || !lastname || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if ((role === "senior" && !jobRole) || (role === "senior" && !company)) {
      return res
        .status(400)
        .json({ message: "Job Role & Company are required." });
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

    if (role === "senior") {
      newUser.experience = {
        company,
        jobRole,
      };
    }

    await newUser.save();

    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
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
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: user });
  } catch (error) {
    logger.error("Login Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0), // Expire immediately
    });
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

const allUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password");
    res.json(user);
  } catch (error) {
    logger.error("Get All User Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getSeniors = async (req, res) => {
  try {
    const user = await User.find({ role: "senior" }).select("-password");
    res.json(user);
  } catch (error) {
    logger.error("Get Senior Error:", error.message);
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
    if (headline !== undefined) updateFields["headline"] = headline;

    if (about !== undefined) updateFields["about"] = about;

    // Experience Updation
    // Experience Updation
    if (experience !== undefined) {
      // Ensure experience is always an array
      const newExperiences = Array.isArray(experience)
        ? experience
        : [experience];

      // Filter only valid experiences (with required fields)
      const validExperiences = newExperiences.filter(
        (exp) =>
          exp.jobRole && exp.company && exp.from && exp.to && exp.description
      );

      if (validExperiences.length > 0) {
        // Append new experiences to old ones
        updateFields["experience"] = [...validExperiences];
      }
    }
    // Education updation
    if (education !== undefined) {
      // Ensure experience is always an array
      const newEducations = Array.isArray(education) ? education : [education];

      // Filtering valid educations
      const validEducations = newEducations.filter(
        (edu) => edu.degree && edu.institution && edu.year
      );

      // Check for valid experience, Add new entry only if it’s valid
      if (validEducations.length > 0) {
        updateFields["education"] = [...validEducations];
      }
    }

    // Skills Updation
    if (skills !== undefined) {
      const newSkills = skills?.split(",").map((skill) => skill.trim());
      const skillSet = new Set([...(user?.skills || []), ...newSkills]);
      updateFields["skills"] = Array.from(skillSet);
    }

    // Location Updation
    if (city !== undefined) updateFields["location.city"] = city;
    if (country !== undefined) updateFields["location.country"] = country;

    // Resume Updation
    if (resumeUrl !== undefined) updateFields["resumeUrl"] = resumeUrl;
    // Linkedin URL Updation
    if (linkedInUrl !== undefined) updateFields["linkedInUrl"] = linkedInUrl;
    // Github URL Updation
    if (githubUrl !== undefined) updateFields["githubUrl"] = githubUrl;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.status(201).json({ user: updatedUser });
  } catch (error) {
    logger.error({ message: "Update user error", error: error.message });
    res
      .status(500)
      .json({ message: "Update user error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.user._id);
    return res.json({ deletedUser: response });
  } catch (error) {
    logger.error({ error });
    return res.json({ message: "Delete User error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  allUsers,
  getSeniors,
  updateUser,
  logoutUser,
  deleteUser,
};
