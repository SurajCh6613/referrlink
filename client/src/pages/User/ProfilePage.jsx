import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BACKEND_API from "../../config/config";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [senior, setSenior] = useState(null);
  const handleRequestReferral = (seniorId) => {
    navigate(`/request-referral/${seniorId}`);
  };
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${BACKEND_API}/api/user/${id}`, {
        withCredentials: true,
      });
      setSenior(response.data);
    };
    fetchUser();
  }, []);
  console.log(senior);
  if (!senior) return <div>Loading...</div>;
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 mt-4 bg-white rounded-2xl shadow-lg">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-full border text-4xl py-6 px-7 bg-indigo-100">{senior?.avatar}</div>
        <div>
          <h2 className="text-2xl font-bold">
            {senior.firstname} {senior.lastname}
          </h2>
          <p className="text-gray-600">
            {senior?.experience[0]?.jobRole} @ {senior?.experience[0]?.company}
          </p>
          <span className="text-sm text-blue-600">
            {senior.role.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 text-gray-700">{senior.about}</p>

      {/* Skills */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg">Skills</h3>
        <ul className="flex flex-wrap gap-2 mt-2">
          {senior.skills?.map((skill, idx) => (
            <li
              key={idx}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div className="mt-6 flex gap-6">
        {senior.linkedInUrl && (
          <a href={senior.linkedInUrl} className="text-blue-600">
            LinkedIn
          </a>
        )}
        {senior.githubUrl && (
          <a href={senior.githubUrl} className="text-gray-800">
            GitHub
          </a>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex gap-4">
        {senior.role === "senior" && (
          <button
            onClick={() => handleRequestReferral(senior._id)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Request Referral
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
