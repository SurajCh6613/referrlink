import React from "react";
import { MdOutlineLock } from "react-icons/md";
import { MdCloudQueue } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { MdOutlineCalendarToday } from "react-icons/md";
import Footer from "../../components/layout/Footer";

const Hero = () => {
  return (
    <div className="">
      {/* Home Section */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 pb-12 p-4">
        <div className="flex flex-col sm:flex-row h-full w-full items-center justify-around pt-4 pl-4 pr-4">
          <div className="w-full sm:w-2/3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-10 flex flex-col gap-4">
              <span>Bridge the Gap Between</span>{" "}
              <span>Talent and Opportunity</span>
            </h1>
            <h3 className="text-xl text-gray-200 mb-10">
              Professionals helping professionals - the right way.
            </h3>
            <div className="flex flex-col sm:block gap-4">
              <button className="bg-white py-4 px-5 rounded-md text-indigo-500 font-bold hover:scale-102 duration-300 mr-4">
                Join Now
              </button>
              <button className="border-2 border-white py-4 px-5 rounded-md text-white hover:bg-indigo-400 duration-200 font-bold mr-4">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-1/3">
            <img
              className="w-44 h-44 sm:w-full sm:h-full"
              src="/logo.png"
              alt="Hero Image"
            />
          </div>
        </div>
        <div className="flex items-center text-center gap-2 sm:gap-6 text-white justify-center m-8 sm:mt-16">
          <div>
            <h3 className="text-md sm:text-3xl font-bold">10,000+</h3>
            <h4 className="text-sm">Successful Referrals</h4>
          </div>
          <div>
            <h3 className="text-md sm:text-3xl font-bold">5,000+</h3>
            <h4 className="text-sm"> Active Professionals</h4>
          </div>
          <div>
            <h3 className="text-md sm:text-3xl font-bold">100+</h3>
            <h4 className="text-sm">Top Companies</h4>
          </div>
        </div>
      </div>
      {/* How It Works Section */}
      <div className="w-full h-50% flex flex-col items-center ">
        <h1 className="font-bold text-3xl mt-16">How ReferrLink Works</h1>
        <div className="flex  flex-col md:flex-row justify-between items-start gap-8 p-16">
          <div className="h-full w-full bg-gray-100  rounded-xl flex flex-col items-start p-6 shadow-md hover:shadow-lg duration-300">
            <h5 className="border w-12 h-12 p-2 pl-4 text-2xl rounded-full font-semibold text-indigo-500 bg-indigo-100 border-none mb-3">
              1
            </h5>
            <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
            <p className="text-gray-700">
              Build a professional profile showcasing your skills, experience,
              and career goals.
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
      </div>

      {/* Why Choose ReferrLink */}
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
                Connects you with the most relevant
                professionals in your field.
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 gap-2">
            <MdOutlineCalendarToday className="w-12 h-12 p-2 bg-indigo-100 rounded-md text-indigo-500" />
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Tracking Dashboard</h3>
              <p className="text-gray-600">
                Monitor all your referral requests and responses in one
                organized place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section>
        <div className="w-full h-50% flex flex-col items-center ">
          <h1 className="font-bold text-3xl mt-16">Success Stories</h1>
          <div className="flex  flex-col md:flex-row justify-between items-start gap-8 p-16">
            <div className="h-full w-full bg-gray-100  rounded-xl flex flex-col items-start p-6 shadow-md hover:shadow-lg duration-300">
              <div className="flex gap-3">
                <img
                  className="border w-12 h-12 p-2 pl-4 text-2xl rounded-full font-semibold text-indigo-500 bg-indigo-100 border-none mb-3"
                  src="/logo.png"
                />
                <div>
                  <h2 className="text-xl font-semibold">Suraj Chaudhary</h2>
                  <p className="text-gray-500">
                    Software Developer at ReferrLink
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                "ReferrLand helped me get 3 interview calls within 2 weeks of
                joining. The platform makes it so easy to connect with the right
                people."
              </p>
            </div>
            <div className="h-full w-full bg-gray-100  rounded-xl flex flex-col items-start p-6 shadow-md hover:shadow-lg duration-300">
              <div className="flex gap-3">
                <img
                  className="border w-12 h-12 p-2 pl-4 text-2xl rounded-full font-semibold text-indigo-500 bg-indigo-100 border-none mb-3"
                  src="/logo.png"
                />
                <div>
                  <h2 className="text-xl font-semibold">Vikas Pandey</h2>
                  <p className="text-gray-500">
                    Software Developer at ReferrLink
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a referrer, I love how the platform organizes all requests
                in one place. It's helped me refer 5 qualified candidates this
                year."
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full h-full py-18 bg-indigo-50">
        <div className="flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
            Ready to Boost Your Career?
          </h3>
          <p className="text-gray-700 text-xl mb-6">
            Join thousands of professionals who are already getting better
            opportunities through referrals.
          </p>
          <button className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 text-xl">
            Get Started - It's Free
          </button>
        </div>
      </section>

      {/*Footer Section  */}
      <Footer />
    </div>
  );
};

export default Hero;
