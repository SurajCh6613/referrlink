import React from "react";

const HowItWorks = () => {
  return (
    <section
      
      className="w-full h-50% flex flex-col items-center "
    >
      <h1 className="font-bold text-3xl mt-16">How ReferrLink Works</h1>
      <div className="flex  flex-col md:flex-row justify-between items-start gap-8 p-16">
        <div className="h-full w-full bg-gray-100  rounded-xl flex flex-col items-start p-6 shadow-md hover:shadow-lg duration-300">
          <h5 className="border w-12 h-12 p-2 pl-4 text-2xl rounded-full font-semibold text-indigo-500 bg-indigo-100 border-none mb-3">
            1
          </h5>
          <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
          <p className="text-gray-700">
            Build a professional profile showcasing your skills, experience, and
            career goals.
          </p>
        </div>
        <div className="h-full w-full bg-gray-100  rounded-xl flex flex-col items-start p-6 shadow-md hover:shadow-lg duration-300">
          <h5 className="w-12 h-12 p-2 pl-4 text-2xl rounded-full font-semibold text-indigo-500 bg-indigo-100 border-none mb-3">
            2
          </h5>
          <h3 className="text-xl font-semibold mb-3">
            Connect with Professionals
          </h3>
          <p className="text-gray-700">
            Find and connect with industry professionals at your target
            companies.
          </p>
        </div>
        <div className="h-full w-full bg-gray-100  rounded-xl flex flex-col items-start p-6 shadow-md hover:shadow-lg duration-300">
          <h5 className="border w-12 h-12 p-2 pl-4 text-2xl rounded-full font-semibold text-indigo-500 bg-indigo-100 border-none mb-3">
            3
          </h5>
          <h3 className="text-xl font-semibold mb-3">Request Referrals</h3>
          <p className="text-gray-700">
            Send personalized referral requests with all the required details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
