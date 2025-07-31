import React from "react";
import { useUser } from "../../context/UserContext";
import Spinner from "../../components/layout/Spinner";

const SeniorDashboard = () => {
  const { user, loading } = useUser();
  // Mock data - replace with real data from your API
  const stats = [
    {
      title: "Pending Requests",
      value: 4,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Referrals Given",
      value: 12,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Avg. Response Time",
      value: "2.1d",
      color: "bg-blue-100 text-blue-800",
    },
  ];

  const pendingRequests = [
    {
      id: 1,
      name: "Alex Johnson",
      company: "Google",
      position: "SWE II",
      date: "2023-08-18",
    },
    {
      id: 2,
      name: "Sam Wilson",
      company: "Microsoft",
      position: "Product Manager",
      date: "2023-08-17",
    },
  ];
  if (!user && loading) return <Spinner />;
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
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
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Pending Requests
            </h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pendingRequests.length} new
            </span>
          </div>
          <div className="divide-y divide-gray-200">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {request.name}
                    </h3>
                    <p className="text-gray-600">
                      {request.position} at {request.company}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">{request.date}</span>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Accept
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Decline
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">RJ</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    You referred{" "}
                    <span className="text-indigo-600">Rahul Joshi</span> to
                    Google
                  </p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-medium">SK</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    Sneha Kumar got hired at Amazon through your referral
                  </p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeniorDashboard;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const SeniorDashboard = () => {
//   const navigate = useNavigate();
//   const user = {
//     name: "Dr. Sarah Smith",
//     email: "sarah.smith@example.com",
//     company: "Google",
//     role: "senior",
//     lastLogin: "1 hour ago",
//   };

//   const stats = [
//     {
//       title: "Pending Requests",
//       value: 4,
//       color: "bg-yellow-100 text-yellow-800",
//     },
//     {
//       title: "Referrals Given",
//       value: 12,
//       color: "bg-green-100 text-green-800",
//     },
//     { title: "Success Rate", value: "85%", color: "bg-blue-100 text-blue-800" },
//   ];

//   const handleLogout = () => {
//     // Add logout logic here
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header with Welcome and Profile */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             Welcome, {user.name}!
//           </h1>
//           <p className="text-gray-600">
//             Senior Dashboard | {user.company} | Last login: {user.lastLogin}
//           </p>
//         </div>

//         <div className="flex items-center space-x-4">
//           <div className="hidden md:block text-right">
//             <p className="text-sm text-gray-500">Signed in as</p>
//             <p className="font-medium">{user.email}</p>
//           </div>
//           <button
//             onClick={() => navigate("/profile")}
//             className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
//           >
//             <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
//               <span className="text-indigo-600 font-medium">SS</span>
//             </div>
//             <span>Profile</span>
//           </button>
//           <button
//             onClick={handleLogout}
//             className="text-gray-600 hover:text-red-600 transition-colors flex items-center space-x-1"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
//           >
//             <h3 className="text-lg font-medium text-gray-500">{stat.title}</h3>
//             <p
//               className={`mt-2 text-3xl font-semibold ${stat.color} px-3 py-1 rounded-full inline-block`}
//             >
//               {stat.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Quick Actions
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button
//             onClick={() => navigate("/my-referrals")}
//             className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
//           >
//             <div className="mx-auto h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-indigo-600"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//               </svg>
//             </div>
//             <span className="text-sm font-medium">My Referrals</span>
//           </button>
//           {/* Add more quick action buttons */}
//         </div>
//       </div>
//       {/* ... rest of the senior dashboard code ... */}
//     </div>
//   );
// };

// export default SeniorDashboard;
