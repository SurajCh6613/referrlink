import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import BACKEND_API from "../../config/config";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [experienceFormData, setExperienceFormData] = useState(
    user.experience.length > 0
      ? user?.experience
      : [{ jobRole: " ", company: "", from: "", to: "", description: "" }]
  );

  const [educationFormData, setEducationFormData] = useState(
    user.education.length > 0
      ? user.education
      : [
          {
            degree: "",
            institution: "",
            year: "",
          },
        ]
  );

  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    headline: user?.headline || "",
    about: user?.about || "",
    city: user?.location?.city || "",
    country: user?.location?.country || "",
    linkedInUrl: user?.linkedInUrl || "",
    githubUrl: user?.githubUrl || "",
    resumeUrl: user?.resumeUrl || "",
    skills: "",
  });

  const addExperience = () => {
    setExperienceFormData((prev) => [
      ...prev,
      { jobRole: " ", company: "", from: "", to: "", description: "" },
    ]);
  };

  const removeExperience = (index) => {
    setExperienceFormData((prev) => prev.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducationFormData((prev) => [
      ...prev,
      {
        degree: "",
        institution: "",
        year: "",
      },
    ]);
  };
  const removeEducation = (index) => {
    setEducationFormData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    if (name.startsWith("Exp")) {
      let expName = name.split(".")[1];
      setExperienceFormData((prev) => {
        const updated = [...prev];
        updated[index][expName] = value;
        return updated;
      });
    }
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    if (name.startsWith("Edu")) {
      const eduName = name.split(".")[1];
      setEducationFormData((prev) => {
        const updated = [...prev];
        updated[index][eduName] = value;
        return updated;
      });
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    //  set Experience Form Data
    if (name.startsWith("Edu")) {
      let eduName = name.split(".")[1];
      setEducationFormData((prev) => ({ ...prev, [eduName]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        ...formData,
        education: educationFormData,
        experience: experienceFormData,
      };
      const response = await axios.patch(`${BACKEND_API}/api/user`, payload, {
        withCredentials: true,
      });
      setUser(response.data.user);
      toast.success("Profile Updated Successfully.");
      navigate("/myProfile");
    } catch (error) {
      toast.error(error || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 px-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Update Your Profile
          </h1>
          <p className="text-gray-600">
            Keep your professional information current
          </p>
        </div>

        {/* Profile Picture */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 text-2xl font-bold">
                  {user.firstname[0]}
                  {user.lastname[0]}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-gray-600">
                {user.role === "junior" ? "Job Seeker" : "Senior Professional"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Basic Information */}
          <div className="bg-white p-6">
            <h3 className="text-xl font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              <div>
                <label
                  htmlFor="firstname"
                  className="text-sm font-semibold text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  defaultValue={user?.firstname}
                  onChange={onChangeHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="text-sm font-semibold text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  defaultValue={user?.lastname}
                  onChange={onChangeHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your last name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  onChange={onChangeHandler}
                  disabled
                  className="border border-gray-400 w-full py-2 px-3 rounded-md bg-gray-100 cursor-not-allowed"
                  placeholder="youremail@gmail.com"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  Professional Headline
                </label>
                <input
                  type="text"
                  name="headline"
                  defaultValue={user?.headline}
                  onChange={onChangeHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Professional Headline"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                About You
              </label>
              <textarea
                id="about"
                rows={4}
                name="about"
                defaultValue={user?.about}
                onChange={onChangeHandler}
                placeholder="About yourself"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Location */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  defaultValue={user?.location?.city}
                  onChange={onChangeHandler}
                  placeholder="Your city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  defaultValue={user?.location?.country}
                  onChange={onChangeHandler}
                  placeholder="Your country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="p-6">
            <h3 className="text-xl font-semibold">
              Your Skills{" "}
              <span className="text-gray-500">(Comma seperated)</span>
            </h3>
            <div className="mt-1">
              <div className="flex flex-wrap gap-2">
                {user?.profile?.skills.map((skill) => (
                  <li
                    key={skill}
                    className="mb-1 bg-indigo-50 px-1 text-gray-600 rounded-md list-none"
                  >
                    {skill}
                  </li>
                ))}
              </div>
              <input
                type="text"
                name="skills"
                onChange={onChangeHandler}
                placeholder="Enter skills (comma seperated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  LinkedIn
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                    <FaLinkedin />
                  </span>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedInUrl"
                    defaultValue={user?.linkedInUrl}
                    onChange={onChangeHandler}
                    placeholder="https://www.linkedin.com/in/user_id"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="github"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  GitHub
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                    <FaGithub />
                  </span>
                  <input
                    type="text"
                    id="github"
                    name="githubUrl"
                    defaultValue={user?.githubUrl}
                    onChange={onChangeHandler}
                    placeholder="https://github.com/user_id"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resume */}
          <div className="p-6">
            <h3 className="text-xl font-semibold">Resume</h3>
            <div>
              <label
                htmlFor="resumeUrl"
                className="text-sm font-semibold text-gray-600"
              >
                Resume URL
              </label>
              <input
                type="text"
                name="resumeUrl"
                defaultValue={user.resumeUrl}
                onChange={onChangeHandler}
                placeholder="Enter your resume link"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white w-full">
            {" "}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Experience</h2>
                <button
                  onClick={addExperience}
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center cursor-pointer"
                >
                  Add Experience
                </button>
              </div>

              {experienceFormData.map((exp, index) => (
                <div
                  key={index}
                  className="mb-6 last:mb-0 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Role
                      </label>
                      <input
                        type="text"
                        defaultValue={exp.jobRole}
                        name="Exp.jobRole"
                        onChange={(e) => handleExperienceChange(index, e)}
                        required
                        placeholder="Software Engineer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        defaultValue={exp.company}
                        name="Exp.company"
                        required
                        onChange={(e) => handleExperienceChange(index, e)}
                        placeholder="Google"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From
                      </label>
                      <input
                        type="date"
                         defaultValue={
                          exp?.from
                            ? new Date(exp.from).toISOString().split("T")[0]
                            : ""
                        }
                        required
                        name="Exp.from"
                        onChange={(e) => handleExperienceChange(index, e)}
                        placeholder="Jan 2022"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To
                      </label>
                      <input
                        type="date"
                        defaultValue={
                          exp?.to
                            ? new Date(exp.to).toISOString().split("T")[0]
                            : ""
                        }
                        name="Exp.to"
                        placeholder="Dec 2025"
                        onChange={(e) => handleExperienceChange(index, e)}
                        required
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                      }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      defaultValue={exp.description}
                      name="Exp.description"
                      onChange={(e) => handleExperienceChange(index, e)}
                      required
                      placeholder="Brief experience"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-500 cursor-pointer"
                    >
                      Remove Experience
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="bg-white w-full md:border-l">
            {" "}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Education</h2>
                <button
                  type="button"
                  onClick={addEducation}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  Add Education
                </button>
              </div>
              {educationFormData.map((edu, index) => (
                <div
                  key={index}
                  className="mb-6 last:mb-0 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        defaultValue={edu.degree}
                        name="Edu.degree"
                        onChange={(e) => handleEducationChange(index, e)}
                        required
                        placeholder="B.Tech"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Institution
                      </label>
                      <input
                        type="text"
                        defaultValue={edu.institution}
                        name="Edu.institution"
                        required
                        onChange={(e) => handleEducationChange(index, e)}
                        placeholder="College Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passing Year
                    </label>
                    <input
                      type="date"
                      defaultValue={
                        edu.year
                          ? new Date(edu.year).toISOString().split("T")[0]
                          : ""
                      }
                      required
                      name="Edu.year"
                      placeholder="2025"
                      onChange={(e) => handleEducationChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-500 cursor-pointer"
                    >
                      Remove Education
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/myProfile")}
            className="px-4 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleUpdate}
            className="inline-flex cursor-pointer justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
