import React from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";

const JuniorDashboard = () => {
  const { user, loading } = useUser();
  const stats = [
    {
      title: "Pending Requests",
      value: 3,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Accepted Referrals",
      value: 5,
      color: "bg-green-100 text-green-800",
    },
    { title: "Rejected Requests", value: 1, color: "bg-red-100 text-red-800" },
  ];

  const recentRequests = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      status: "Pending",
      date: "2023-08-15",
    },
    {
      id: 2,
      company: "Amazon",
      position: "Frontend Developer",
      status: "Accepted",
      date: "2023-08-10",
    },
    {
      id: 3,
      company: "Amazon",
      position: "Frontend Developer",
      status: "Rejected",
      date: "2023-08-10",
    },
  ];
  if (loading) return <Spinner />;
  return (
    <section className="p-6 bg-gray-50">
      <div className="flex justify-between w-full h-12 mb-8">
        <div>
          <h2 className="text-xl md:text-3xl font-bold">
            Welcome <span className="text-indigo-600">{user?.firstname + " " + user?.lastname || "Junior"}</span>
          </h2>
          <p className="text-gray-600">
            Track your referral requests and progress
          </p>
        </div>
        <button className="bg-indigo-600 text-white font-semibold text-xs px-2 sm:text-sm sm:px-3 rounded-md  py-1 cursor-pointer">
          <Link to={"/find-senior"}>Request New Referral</Link>
        </button>
      </div>
      {/* Stats */}
      <div className="w-full h-full  flex flex-col gap-6 md:flex-row">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white w-full h-full p-4 rounded-md shadow-sm hover:shadow-md duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {stat.title}
            </h3>
            <p
              className={`w-12 h-12 px-4 py-1 rounded-full text-3xl font-semibold ${stat.color}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Request */}
      <div className="w-full h-full bg-white rounded-md mt-12 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-600 p-6">
          Your Recent Request
        </h1>
        <div className="bg-gray-50 flex  justify-between py-2 text-xs text-gray-600 uppercase font-semibold">
          <h3 className="w-full px-6">Company</h3>
          <h3 className="w-full px-6">Position</h3>
          <h3 className="w-full px-6">Status</h3>
          <h3 className=" w-full px-6">Date</h3>
        </div>
        {recentRequests.map((request) => (
          <div
            key={request.id}
            className="flex  justify-between text-sm text-gray-400 border-b border-gray-300 py-4"
          >
            <h3 className="w-full text-gray-800 px-6">{request.company}</h3>
            <h3 className="w-full px-6">{request.position}</h3>
            <h3
              className={`w-full px-6 font-semibold ${
                request.status === "Accepted"
                  ? "text-green-800"
                  : request.status === "Rejected"
                  ? " text-red-800"
                  : " text-yellow-500"
              }`}
            >
              {request.status}
            </h3>
            <h3 className=" w-full px-2 sm:px-6">{request.date}</h3>
          </div>
        ))}
      </div>
      <button className="bg-indigo-600 w-55 text-white font-semibold rounded-md px-3 ml-[25%] sm:ml-[35%] md:ml-[40%] py-2 cursor-pointer mt-8">
        <Link to={"/find-senior"}>Request New Referral</Link>
      </button>
    </section>
  );
};

export default JuniorDashboard;
