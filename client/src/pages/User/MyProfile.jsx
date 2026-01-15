import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="max-w-4xl mx-auto">
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
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-gray-600">{user?.headline}</p>
              <span className="text-gray-500">
                {user?.location?.city}
                {", "}
                {user?.location?.country}
              </span>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Basic Information */}
          <div className="bg-white px-6 py-2">
            <h3 className="text-xl font-semibold">Basic Information</h3>
          </div>

          {/* About Section */}
          <div className="px-6 py-2 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {user?.about}
              </label>
            </div>
          </div>

          {/* Skills */}
          <div className="px-6 py-2">
            <h3 className="text-xl font-semibold">Your Skills</h3>
            <div className="mt-1">
              <div className="flex flex-wrap gap-2">
                {user?.skills.map((skill) => (
                  <li
                    key={skill}
                    className="mb-1 bg-indigo-50 px-1 text-gray-600 rounded-md list-none"
                  >
                    {skill}
                  </li>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="px-6 py-2">
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="linkedin"
                  className=" text-sm font-medium text-gray-700 mb-1"
                >
                  LinkedIn :{" "}
                  <a
                    href={user?.linkedInUrl}
                    className="text-indigo-600"
                    type="_blank"
                  >
                    {user?.linkedInUrl}
                  </a>
                </label>
              </div>
              <div>
                <label
                  htmlFor="github"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  GitHub :{" "}
                  <a href={user?.githubUrl} className="text-indigo-600">
                    {user?.githubUrl}
                  </a>
                </label>
              </div>
            </div>
          </div>

          {/* Resume */}
          <div className="px-6 py-2">
            <h3 className="text-xl font-semibold">
              Resume URL:{" "}
              <a href={user?.resumeUrl} className="text-indigo-600 underline">
                See Resume
              </a>{" "}
            </h3>
          </div>

          {/* Experience & Education */}
          <div className="flex flex-col md:flex-row ">
            {" "}
            {/* Experience Section */}
            <div className="bg-white w-full">
              {" "}
              <div className="p-6 ">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Experience</h2>
                </div>

                {user.experience.length > 0 ? (
                  user.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-xl p-4 border border-gray-300 hover:shadow-lg transition-shadow mb-2"
                    >
                      <h3 className="text-lg font-bold text-indigo-600">
                        {exp.jobRole}
                        <span className="text-sm text-gray-500">
                          {" "}
                          at {exp.company}
                        </span>
                      </h3>

                      <p className="text-sm text-gray-400">
                        {exp?.from
                          ? new Date(exp.from).toLocaleDateString()
                          : "YYYY"}{" "}
                        -{" "}
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
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Education</h2>
                </div>

                {user.education.length > 0 ? (
                  user.education.map((edu) => (
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
            <Link
              to={
                user.role === "junior"
                  ? "/junior-dashboard"
                  : "/senior-dashboard"
              }
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Dashboard
            </Link>
            <Link
              to={"/update-profile"}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
