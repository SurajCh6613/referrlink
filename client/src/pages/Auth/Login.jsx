import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("junior");
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="flex items-center justify-center w-full h-full bg-gray-50 px-12 py-8">
        <div className="flex flex-col gap-3 justify-between w-112 h-full rounded-md shadow-md px-10 py-2">
          <h3 className="text-3xl text-center font-semibold">
            Welcome back to Referr<span className="text-indigo-600">Link</span>
          </h3>
          <p className="text-gray-600">
            Connect with professionals to advance your career
          </p>
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-3 justify-between"
          >
            <div>
              <label>{isLogin ? "Login as:" : "Register as:"}</label>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setRole("junior")}
                  className={`w-full px-3 py-4 border rounded-md text-xl shadow-md duration-300 ${
                    role === "junior"
                      ? "border-2 border-indigo-500 bg-indigo-100 font-semibold"
                      : "border-gray-400 hover:scale-102"
                  }`}
                >
                  Junior
                </button>
                <button
                  onClick={() => setRole("senior")}
                  className={`w-full px-3 py-4 border rounded-md text-xl shadow-md duration-300 ${
                    role === "senior"
                      ? "border-2 border-indigo-500 bg-indigo-100 font-semibold"
                      : "border-gray-400 hover:scale-102"
                  }`}
                >
                  Senior
                </button>
              </div>
            </div>

            {!isLogin ? (
              <div className="flex flex-col">
                <label htmlFor="username">Full Name</label>
                <input
                  className="border border-gray-400 shadow-md rounded-md p-3"
                  type="text"
                  placeholder="Enter You Full Name"
                />
              </div>
            ) : (
              ""
            )}

            <div className="flex flex-col">
              <label htmlFor="email">Email Address</label>
              <input
                className="border border-gray-400 shadow-md rounded-md p-3"
                type="email"
                placeholder="example@gmail.com"
                autoComplete="username"
              />
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="email">Password</label>
              <input
                className="border border-gray-400 shadow-md rounded-md p-3"
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                autoComplete="current-password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-9 text-xl cursor-pointer z-10"
              >
                {showPassword ? (
                  <IoMdEyeOff className={`text-gray-400`} />
                ) : (
                  <IoMdEye className={`text-gray-400`} />
                )}
              </button>
            </div>
            {!isLogin ? (
              <>
                <div className="flex flex-col">
                  <label htmlFor="college">College/University</label>
                  <input
                    className="border border-gray-400 shadow-md rounded-md p-3"
                    type="text"
                    placeholder="Enter Your College"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="skills">Skills (comma-seperated)</label>
                  <input
                    className="border border-gray-400 shadow-md rounded-md p-3"
                    type="password"
                    placeholder="e.g., React,Java,JavaScript"
                  />
                </div>
              </>
            ) : (
              ""
            )}
            <button className="bg-indigo-500 w-full py-3 rounded-md hover:bg-indigo-400 duration-300 text-white font-semibold">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <div className="mb-6 text-center mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="text-indigo-500 font-semibold cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
