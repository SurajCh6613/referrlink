import React, { useEffect, useMemo, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Spinner from "../../components/layout/Spinner";
import axios from "axios";
import BACKEND_API from "../../config/config";

const SeniorDashboard = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const [recentRequests, setRecentRequest] = useState([]);
  const [activities, setActivities] = useState([]);
  const [averageResponseTime, setAverageResponseTime] = useState();
  const pendingRequests = useMemo(
    () => recentRequests.filter((r) => r.status == "pending"),
    [recentRequests]
  );
  const acceptedRequest = useMemo(
    () => recentRequests.filter((r) => r.status == "accepted"),
    [recentRequests]
  );
  const stats = [
    {
      title: "Pending Requests",
      value: pendingRequests.length,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Referrals Given",
      value: acceptedRequest.length,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Avg. Response Time",
      value: averageResponseTime
        ? averageResponseTime.days > 0
          ? `${averageResponseTime.days}d`
          : averageResponseTime.hours > 0
          ? `${averageResponseTime.hours}h`
          : `${averageResponseTime.minutes}m`
        : `_`,
      color: "bg-blue-100 text-blue-800",
    },
  ];

  // Fetching Average Response time
  const fetchAverageResponseTime = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_API}/api/referral/avg-response-time`,
        {
          withCredentials: true,
        }
      );
      setAverageResponseTime(res.data.avgResponseTime);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Reponse Resquest
  const handleResponseRequest = async (requestId, newStatus) => {
    try {
      await axios.patch(
        `${BACKEND_API}/api/referral/${requestId}`,
        { status: newStatus, responsedAt: Date.now() },
        {
          withCredentials: true,
        }
      );

      // Find Request details
      const reqData = recentRequests.find((req) => req._id === requestId);
      const res = await axios.post(
        `${BACKEND_API}/api/activity`,
        {
          user: `${reqData.senderId.firstname} ${reqData.senderId.lastname}`,
          company: reqData.company,
          role: reqData.jobRole,
          action: newStatus,
        },
        { withCredentials: true }
      );
      setRecentRequest((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: newStatus } : req
        )
      );
      const newActivity = res.data.newActivity;
      setActivities((prev) => [newActivity, ...prev]);
    } catch (error) {
      console.log(error || "Update response error");
    }
  };
  // Fetching all Requests
  const fetchRequests = async () => {
    const { data } = await axios.get(`${BACKEND_API}/api/referral/`, {
      withCredentials: true,
    });
    setRecentRequest(data.referralRequests);
  };

  console.log(recentRequests);
  // Fetching recent activities
  const fetchActivities = async () => {
    const res = await axios.get(`${BACKEND_API}/api/activity`, {
      withCredentials: true,
    });
    setActivities(res.data.activities);
  };

  useEffect(() => {
    fetchActivities();
    fetchRequests();
    fetchAverageResponseTime();
  }, []);

  if (loading) return <Spinner />;
  if (!user) return navigate("/login");
  return (
    <>
      <div className="min-h-screen bg-gray-50 section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome,{" "}
            <span className="text-indigo-600">
              {user?.firstname + " " + user?.lastname || "Senior"}
            </span>
          </h1>
          <p className="text-gray-600">Manage incoming referral requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-500">
                {stat.title}
              </h3>
              <p
                className={`mt-2 text-3xl font-semibold ${stat.color} px-3 py-1 rounded-full inline-block`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Pending Requests
            </h2>
            <span className="bg-indigo-50 text-red-500 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pendingRequests.length} new
            </span>
          </div>
          <div className="max-h-76 min-h-20 overflow-auto divide-gray-200">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <div
                  key={request._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <h3 className="text-lg font-medium text-gray-900 flex justify-between items-center">
                        {request.senderId.firstname} {request.senderId.lastname}
                        <p className="text-xs md:text-sm text-gray-500">
                          {new Date(request.createdAt).toDateString()}
                        </p>
                      </h3>
                      <p className="text-gray-600">
                        {request.jobRole} at {request.company}
                      </p>
                      <p className="text-sm w-full">{request.message}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => {
                        handleResponseRequest(request._id, "accepted");
                        navigate("/senior-dashboard");
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleResponseRequest(request._id, "rejected")
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => navigate(`/user/${request.senderId._id}`)}
                      className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-full h-20 text-2xl text-gray-600 flex items-center justify-center">
                No Pending Requests
              </p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Recent Activity
            </h2>
          </div>
          <div className="p-6 w-full h-34 overflow-auto">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity._id} className=" mb-2 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div
                      className={`${
                        activity.action === "accepted"
                          ? "bg-green-100"
                          : "bg-red-100"
                      } flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center`}
                    >
                      <span
                        className={`${
                          activity.action === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        } font-medium`}
                      >
                        RJ
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        You{" "}
                        {activity.action === "accepted"
                          ? "referred"
                          : "rejected"}
                        <span className="text-indigo-600">
                          {" "}
                          {activity.user}
                        </span>{" "}
                        {activity.action === "accepted"
                          ? `to ${activity.company}`
                          : `application for ${activity.company}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="flex w-full h-full items-center justify-center text-2xl text-gray-600">
                No recent activities
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeniorDashboard;
