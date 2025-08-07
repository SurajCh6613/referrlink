const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["junior", "senior"],
      default: "junior",
    },
    avatar: {
      type: String,
      default: "",
    },
    profile: {
      headline: String,
      about: String,
      experience: [
        {
          title: String,
          company: String,
          from: Date,
          to: Date,
          description: String,
        },
      ],
      education: [
        {
          degree: String,
          institution: String,
          year: String,
        },
      ],
      skills: [String],
      location: {
        city: String,
        country: String,
      },
      resumeUrl: String,
      linkedInUrl: String,
      githubUrl: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
