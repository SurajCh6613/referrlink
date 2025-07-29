import React from "react";

const SuccessStories = () => {
  return (
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
              "As a referrer, I love how the platform organizes all requests in
              one place. It's helped me refer 5 qualified candidates this year."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
