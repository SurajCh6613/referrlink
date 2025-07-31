import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { useUser } from "../context/UserContext";
import { TbMoodSad } from "react-icons/tb";

const FindSenior = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    company: "",
    position: "",
  });

  // Mock data - replace with API call
  const seniors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      company: "Google",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      skills: ["React", "Node.js", "Machine Learning"],
      connectionStatus: "pending",
      avatar: "SC",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      company: "Microsoft",
      position: "Principal Engineer",
      location: "Seattle, WA",
      skills: ["Azure", ".NET", "Cloud Architecture"],
      connectionStatus: null,
      avatar: "MR",
    },
    {
      id: 3,
      name: "Priya Patel",
      company: "Amazon",
      position: "Engineering Manager",
      location: "New York, NY",
      skills: ["AWS", "Leadership", "System Design"],
      connectionStatus: "connected",
      avatar: "PP",
    },
  ];

  const handleRequestReferral = (seniorId) => {
    navigate(`/request-referral/${seniorId}`);
  };

  const filteredSeniors = seniors.filter((senior) => {
    const matchesSearch =
      senior.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      senior.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany =
      !filters.company || senior.company === filters.company;
    const matchesPosition =
      !filters.position ||
      senior.position.toLowerCase().includes(filters.position.toLowerCase());
    return matchesSearch && matchesCompany && matchesPosition;
  });

  return (
    <>
      <div className=" bg-gray-50 p-6">
        <div>
          <h1 className="text-3xl font-bold">Find Senior Professionals</h1>
          <p className="text-gray-600">
            Connect with experienced professionals who can refer you to top
            companies
          </p>
        </div>
        <div className="w-full bg-white p-6 rounded-xl shadow-sm mt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search bar */}
            <div className="md:col-span-2 ">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <MdSearch className="absolute text-2xl text-gray-400 top-2 left-2 " />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 px-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                  placeholder="Search by name or company"
                />
              </div>
            </div>
            <div className="w-full border border-gray-300 flex justify-center rounded-md">
              <select
                value={filters.company}
                onChange={(e) =>
                  setFilters({ ...filters, company: e.target.value })
                }
                className="w-full pl-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                name="company"
                id="company"
              >
                <option value="">All Companies</option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Microsoft">Microsoft</option>
              </select>
            </div>
            <div className="w-full border border-gray-300 flex justify-center rounded-md">
              <select
                value={filters.position}
                onChange={(e) =>
                  setFilters({ ...filters, position: e.target.value })
                }
                className="w-full pl-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                name="company"
                id="company"
              >
                <option value="">All Positions</option>
                <option value="Engineering">Engineering</option>
                <option value="Management">Management</option>
                <option value="Product">Product</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          {filteredSeniors.length > 0 ? (
            filteredSeniors.map((senior, index) => (
              <div
                key={index}
                className="w-full h-full bg-white shadow-sm hover:shadow-md rounded-xl my-4 flex justify-between p-6"
              >
                <div className="flex items-start gap-4 p-4">
                  <div className="bg-indigo-200 rounded-full">
                    <p className="w-12 h-12 px-3 py-2 text-xl text-indigo-500 font-semibold">
                      {senior.avatar}
                    </p>
                  </div>
                  <div className="w-full h-full">
                    <h1 className="text-xl font-bold">{senior.name}</h1>
                    <h3 className="text-sm text-gray-700 mt-2">
                      {senior.position} at {senior.company}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2">
                      {senior.location}
                    </p>
                    <p className="flex gap-2 mt-2">
                      {senior.skills.map((skill, index) => (
                        <li
                          key={index}
                          className="text-xs font-semibold bg-gray-200 text-gray-700 list-none border  px-2 border-gray-200 shadow-sm  rounded-md"
                        >
                          {skill}
                        </li>
                      ))}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                      onClick={()=>handleRequestReferral(senior.id)}
                        className={`text-sm  font-semibold px-3 py-2  rounded-md  ${
                          senior.connectionStatus === "pending"
                            ? "bg-gray-200 cursor-not-allowed text-gray-600"
                            : "cursor-pointer text-white bg-indigo-600 border hover:bg-indigo-700"
                        }`}
                      >
                        {senior.connectionStatus === "pending"
                          ? "Request Sent"
                          : "Request Referral"}
                      </button>
                      <button className="text-sm   bg-gray-50 border-gray-400 cursor-pointer font-semibold px-3 py-2 hover:bg-gray-100 rounded-md border">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      senior.connectionStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : senior.connectionStatus === "connected"
                        ? "bg-green-100 text-green-800"
                        : ""
                    }`}
                  >
                    {senior?.connectionStatus}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl flex justify-center items-center flex-col shadow-sm p-8">
              <TbMoodSad className="text-gray-400 w-12 h-12" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No professionals found
              </h3>
              <p className="mt-1 text-gray-500">
              Hey {user?.name} try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FindSenior;
