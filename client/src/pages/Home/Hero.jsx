import React from "react";
import Footer from "../../components/layout/Footer";
import HowItWorks from "./HowItWorks";
import WhyChooseReferrLink from "./WhyChooseReferrLink";
import SuccessStories from "./SuccessStories";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="">
      {/* Home Section */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 md:pb-12 sm:p-4">
        <div className="flex flex-col-reverse sm:flex-row h-full w-full items-center justify-around pt-4 pl-4 pr-4">
          <div className="w-full sm:w-2/3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-10 flex flex-col gap-4">
              <span>Bridge the Gap Between</span>{" "}
              <span>Talent and Opportunity</span>
            </h1>
            <h3 className="text-xl text-gray-200 mb-10">
              Professionals helping professionals - the right way.
            </h3>
            <div className="flex flex-col sm:block gap-4">
              <Link
                to={"/login"}
                className="bg-white py-4 px-5 rounded-md text-indigo-500 text-center font-bold hover:scale-102 duration-300 mr-4 cursor-pointer"
              >
                Join Now
              </Link>
              <button className="border-2 border-white py-4 px-5 rounded-md text-white hover:bg-indigo-400 duration-200 font-bold mr-4 cursor-pointer">
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
      <HowItWorks />

      {/* Why Choose ReferrLink */}
      <WhyChooseReferrLink />

      {/* Success Stories */}
      <SuccessStories />
      {/* CTA Section */}
      <section className="w-full h-full px-4 py-8 md:py-16 bg-indigo-50">
        <div className="flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
            Ready to Boost Your Career?
          </h3>
          <p className="text-gray-700 text-xl mb-6">
            Join thousands of professionals who are already getting better
            opportunities through referrals.
          </p>
          <Link
            to={"/login"}
            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 text-xl"
          >
            Get Started - It's Free
          </Link>
        </div>
      </section>

      {/*Footer Section  */}
      <Footer />
    </div>
  );
};

export default Hero;
