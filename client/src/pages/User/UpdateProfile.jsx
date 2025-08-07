import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import MyProfile from "./MyProfile";
import BACKEND_API from "../../config/config";

const UpdateProfile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    headline: user?.profile?.headline || "",
    about: user?.profile?.about || "",
    city: user?.profile?.location?.city || "",
    country: user?.profile?.location?.country || "",
    linkedInUrl: user?.profile?.linkedInUrl || "",
    githubUrl: user?.profile?.githubUrl || "",
    resumeUrl: user?.profile?.resumeUrl || "",
    skills: "",
    experience: {
      title: "",
      company: "",
      from: "",
      to: "",
      description: "",
    },
    education: {
      degree: "",
      institution: "",
      year: "",
    },
  });

  const [addExperienceForm, setAddExperienceForm] = useState(false);
  const [addEducationForm, setAddEducationForm] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (
      name === "title" ||
      name === "company" ||
      name === "from" ||
      name === "to" ||
      name === "description"
    ) {
      setFormData((prev) => ({
        ...prev,
        experience: {
          ...prev.experience,
          [name]: value,
        },
      }));
    } else if (name === "degree" || name === "institution" || name === "year") {
      setFormData((prev) => ({
        ...prev,
        education: {
          ...prev.education,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${BACKEND_API}/api/user/update/${user._id}`,
        formData,
        { withCredentials: true }
      );
      setUser(response.data.user);
      navigate("/myProfile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
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
                  defaultValue={user?.profile?.headline}
                  onChange={onChangeHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Professional Headline"
                />
              </div>
            </div>
            <div></div>
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
                defaultValue={user?.profile?.about}
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
                  defaultValue={user?.profile?.location?.city}
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
                  defaultValue={user?.profile?.location?.country}
                  onChange={onChangeHandler}
                  placeholder="Your country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="p-6">
            <h3 className="text-xl font-semibold">Your Skills</h3>
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
                    defaultValue={user?.profile?.linkedInUrl}
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
                    defaultValue={user?.profile?.githubUrl}
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
                defaultValue={user.profile.resumeUrl}
                onChange={onChangeHandler}
                placeholder="Enter your resume link"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Experience & Education */}
          <div className="flex flex-col md:flex-row ">
            {" "}
            {/* Experience Section */}
            <div className="bg-white w-full">
              {" "}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Experience</h2>
                  <button
                    onClick={() => setAddExperienceForm(!addExperienceForm)}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    {addExperienceForm ? "Close" : "Add Experience"}
                  </button>
                </div>

                {addExperienceForm ? (
                  <div className="mb-6 last:mb-0 p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title
                        </label>
                        <input
                          type="text"
                          defaultValue=""
                          name="title"
                          onChange={onChangeHandler}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          defaultValue=""
                          name="company"
                          required
                          onChange={onChangeHandler}
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
                          defaultValue=""
                          required
                          name="from"
                          onChange={onChangeHandler}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          To
                        </label>
                        <input
                          type="date"
                          defaultValue=""
                          name="to"
                          onChange={onChangeHandler}
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
                        defaultValue=""
                        name="description"
                        onChange={onChangeHandler}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {user.profile.experience.length > 0 ? (
                  user.profile.experience.map((exp) => (
                    <div
                      key={exp._id}
                      className="bg-white shadow-md rounded-xl p-4 border border-gray-300 hover:shadow-lg transition-shadow mb-2"
                    >
                      <h3 className="text-lg font-bold text-indigo-600">
                        {exp.title}
                        <span className="text-sm text-gray-500">
                          {" "}
                          at {exp.company}
                        </span>
                      </h3>

                      <p className="text-sm text-gray-400">
                        {new Date(exp.from).toLocaleDateString()} -{" "}
                        {exp.to
                          ? new Date(exp.to).toLocaleDateString()
                          : "Present"}
                      </p>
                      <p className="text-sm mt-2 text-gray-700">
                        {exp.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xl rounded-md text-gray-400  p-4">
                    No Experience added
                  </p>
                )}
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
                    onClick={() => setAddEducationForm(!addEducationForm)}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    {addEducationForm ? "Close" : "Add Education"}
                  </button>
                </div>

                {addEducationForm ? (
                  <div className="mb-6 last:mb-0 p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Degree
                        </label>
                        <input
                          type="text"
                          defaultValue=""
                          name="degree"
                          onChange={onChangeHandler}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          defaultValue=""
                          name="institution"
                          required
                          onChange={onChangeHandler}
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
                        defaultValue=""
                        required
                        name="year"
                        onChange={onChangeHandler}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {user.profile.education.length > 0 ? (
                  user.profile.education.map((edu) => (
                    <div
                      key={edu._id}
                      className="bg-white shadow-md rounded-xl p-4 border border-gray-300 hover:shadow-lg transition-shadow mb-2"
                    >
                      <h3 className="text-lg font-bold text-indigo-600">
                        {edu.degree}
                        <span className="text-sm text-gray-500">
                          {" "}
                          from {edu.institution}
                        </span>
                      </h3>

                      <p className="text-sm text-gray-400">{edu.year}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center rounded-md text-xl text-gray-400 p-4">
                    No Education added
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleUpdate}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
