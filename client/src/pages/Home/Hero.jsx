// import React from "react";
// import Footer from "../../components/layout/Footer";
// import HowItWorks from "./HowItWorks";
// import WhyChooseReferrLink from "./WhyChooseReferrLink";
// import SuccessStories from "./SuccessStories";
// import { Link } from "react-router-dom";

// const Hero = () => {
//   return (
//     <div className="">
//       {/* Home Section */}
//       <div className="bg-linear-to-r from-indigo-700 to-blue-100 p-2 md:pb-12 sm:p-4">
//         <div className="flex flex-col-reverse sm:flex-row z-10 h-full w-full items-center pt-4 pl-4 pr-4">
//           <div className="w-full sm:w-2/3">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-10 flex flex-col gap-4">
//               <span>Bridge the Gap Between</span>{" "}
//               <span>Talent and Opportunity</span>
//             </h1>
//             <h3 className="text-xl text-gray-200 mb-10">
//               Professionals helping professionals - the right way.
//             </h3>
//             <div className="flex flex-col sm:block gap-4">
//               <Link
//                 to={"/login"}
//                 className="bg-white py-4 px-5 rounded-md text-indigo-500 text-center font-bold hover:scale-102 duration-300 mr-4 cursor-pointer"
//               >
//                 Join Now
//               </Link>
//               <button className="border-2 border-white py-4 px-5 rounded-md text-white hover:bg-indigo-400 duration-200 font-bold mr-4 cursor-pointer">
//                 Learn More
//               </button>
//             </div>
//           </div>
//           <div className="w-1/3">
//             <img
//               className="w-44 h-44 sm:w-full sm:h-full"
//               src="/logo.png"
//               alt="Hero Image"
//             />
//           </div>
//         </div>
//         <div className="flex items-center text-center gap-2 sm:gap-6 text-white justify-center m-8 sm:mt-16">
//           <div>
//             <h3 className="text-md sm:text-3xl font-bold">10,000+</h3>
//             <h4 className="text-sm">Successful Referrals</h4>
//           </div>
//           <div>
//             <h3 className="text-md sm:text-3xl font-bold">5,000+</h3>
//             <h4 className="text-sm"> Active Professionals</h4>
//           </div>
//           <div>
//             <h3 className="text-md sm:text-3xl font-bold">100+</h3>
//             <h4 className="text-sm">Top Companies</h4>
//           </div>
//         </div>
//       </div>
// {/* How It Works Section */}
// <HowItWorks />

// {/* Why Choose ReferrLink */}
// <WhyChooseReferrLink />

// {/* Success Stories */}
// <SuccessStories />
// {/* CTA Section */}
// <section className="w-full h-full px-4 py-8 md:py-16 bg-indigo-50">
//   <div className="flex flex-col items-center">
//     <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
//       Ready to Boost Your Career?
//     </h3>
//     <p className="text-gray-700 text-xl mb-6">
//       Join thousands of professionals who are already getting better
//       opportunities through referrals.
//     </p>
//     <Link
//       to={"/login"}
//       className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 text-xl"
//     >
//       Get Started - It's Free
//     </Link>
//   </div>
// </section>

// {/*Footer Section  */}
// <Footer />
//     </div>
//   );
// };

// export default Hero;

import React from "react";
import {
  Search,
  Users,
  Building2,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import HowItWorks from "./HowItWorks";
import WhyChooseReferrLink from "./WhyChooseReferrLink";
import SuccessStories from "./SuccessStories";
import Footer from "../../components/layout/Footer";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const stats = [
    { number: "10,000+", label: "Successful Referrals", icon: CheckCircle },
    { number: "5,000+", label: "Active Professionals", icon: Users },
    { number: "100+", label: "Top Companies", icon: Building2 },
  ];

  const features = [
    "Verified professional network",
    "AI-powered job matching",
    "Referral bonus tracking",
    "Career growth insights",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="pt-24 sm:pt-28 pb-8 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>Trusted by 100+ leading companies</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Bridge the Gap Between{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Talent and Opportunity
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Professionals helping professionals - the right way. Connect
                with verified referrers and unlock your dream job through
                trusted networks.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold text-lg flex items-center justify-center group"
                >
                  Join Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200 font-semibold text-lg"
                >
                  Learn More
                </button>
              </div>

              {/* Features List */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Right Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                {/* Background Gradient Orbs */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

                {/* Search Icon Visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                      <Search className="w-24 h-24 text-white" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
                      <Users className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute top-10 left-10 bg-white p-4 rounded-xl shadow-lg animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Top Companies
                      </div>
                      <div className="text-xs text-gray-500">
                        100+ hiring now
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-20 right-10 bg-white p-4 rounded-xl shadow-lg animate-float-delayed">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Success Rate
                      </div>
                      <div className="text-xs text-gray-500">85% placement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium text-sm sm:text-base">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
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
}
