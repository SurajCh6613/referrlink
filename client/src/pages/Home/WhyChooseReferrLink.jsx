import React from "react";
import { MdOutlineLock } from "react-icons/md";
import { MdCloudQueue } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { MdOutlineCalendarToday } from "react-icons/md";

const WhyChooseReferrLink = () => {
  return (
    <section className="bg-gray-50">
      <h1 className="text-center font-bold text-3xl pt-12">
        Why Choose ReferrLink
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-12">
        <div className="flex items-center p-2 gap-2">
          <MdOutlineDone className="w-12 h-12 p-2 bg-indigo-100 rounded-md text-indigo-500" />
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Professional Network</h3>
            <p className="text-gray-600">
              Connect with verified professionals who are genuinely willing to
              help.
            </p>
          </div>
        </div>
        <div className="flex items-center p-2 gap-2">
          <MdOutlineLock className="w-12 h-12 p-2 bg-indigo-100 rounded-md text-indigo-500" />
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Secure Platform</h3>
            <p className="text-gray-600">
              Your data is protected with industry-standard security measures.
            </p>
          </div>
        </div>
        <div className="flex items-center p-2 gap-2">
          <MdCloudQueue className="w-12 h-12 p-2 bg-indigo-100 rounded-md text-indigo-500" />
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Targeted Connections</h3>
            <p className="text-gray-600">
              Connects you with the most relevant professionals in your field.
            </p>
          </div>
        </div>
        <div className="flex items-center p-2 gap-2">
          <MdOutlineCalendarToday className="w-12 h-12 p-2 bg-indigo-100 rounded-md text-indigo-500" />
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Tracking Dashboard</h3>
            <p className="text-gray-600">
              Monitor all your referral requests and responses in one organized
              place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseReferrLink;
