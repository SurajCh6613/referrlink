import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import BACKEND_API from "../../config/config";
const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser, loading, setLoading } = useUser();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "junior",
    jobRole: "",
    company: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const loginHandler = async (e) => {
    const endpoint = isLogin ? "login" : "register";
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_API}/api/user/${endpoint}`,
        formData,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      formData.role === "junior"
        ? navigate("/junior-dashboard")
        : navigate("/senior-dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log("Login Error:", error, error.response, error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-full bg-gray-50 md:px-12 py-8">
        <div className="flex flex-col gap-3 justify-between w-112 h-full rounded-md shadow-md px-10 py-2">
          <h3 className="text-3xl text-center font-semibold">
            Welcome back to Referr<span className="text-indigo-600">Link</span>
          </h3>
          <p className="text-gray-600">
            Connect with professionals to advance your career
          </p>
          <form
            onSubmit={loginHandler}
            className="flex flex-col gap-3 justify-between"
          >
            <div>
              <label>{isLogin ? "Login as:" : "Register as:"}</label>
              <div className="flex items-center justify-center gap-4 mt-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData((prev) => ({ ...prev, role: "junior" }));
                  }}
                  name="role"
                  className={`w-full px-2 py-2 md:px-3 md:py-4 border rounded-md text-xl shadow-md duration-300 ${
                    formData.role === "junior"
                      ? "border-2 border-indigo-500 bg-indigo-100 font-semibold"
                      : "border-gray-400 hover:scale-102"
                  }`}
                >
                  Junior
                </button>
                <button
                  name="role"
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData((prev) => ({ ...prev, role: "senior" }));
                  }}
                  className={`w-full px-2 py-2 md:px-3 md:py-4  border rounded-md text-xl shadow-md duration-300 ${
                    formData.role === "senior"
                      ? "border-2 border-indigo-500 bg-indigo-100 font-semibold"
                      : "border-gray-400 hover:scale-102"
                  }`}
                >
                  Senior
                </button>
              </div>
            </div>

            {!isLogin ? (
              <div className="flex flex-col w-full">
                <label htmlFor="username">Full Name</label>
                <div className="flex justify-between gap-2">
                  <input
                    name="firstname"
                    className="border w-1/2 border-gray-400 shadow-md rounded-md p-3"
                    type="text"
                    placeholder="First name"
                    required
                    onChange={onChangeHandler}
                  />
                  <input
                    name="lastname"
                    className="border w-1/2 border-gray-400 shadow-md rounded-md p-3"
                    type="text"
                    placeholder="Last name"
                    required
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex flex-col">
              <label htmlFor="email">Email Address</label>
              <input
                name="email"
                className="border border-gray-400 shadow-md rounded-md p-3"
                type="email"
                placeholder="example@gmail.com"
                autoComplete="username"
                required
                onChange={onChangeHandler}
              />
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                className="border border-gray-400 shadow-md rounded-md p-3"
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                autoComplete="current-password"
                required
                onChange={onChangeHandler}
              />
              <button
                type="button"
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
            {formData.role === "senior" && !isLogin && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="jobRole">Job Role</label>
                  <input
                    name="jobRole"
                    className="border border-gray-400 shadow-md rounded-md p-3"
                    type="text"
                    required
                    placeholder="Software Developer"
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="company">Company</label>
                  <input
                    name="company"
                    className="border border-gray-400 shadow-md rounded-md p-3"
                    type="text"
                    placeholder="Google"
                    required
                    onChange={onChangeHandler}
                  />
                </div>
              </>
            )}
            <button className="bg-indigo-500 w-full py-3 mt-2 rounded-md hover:bg-indigo-400 duration-300 text-white font-semibold">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="mb-6 text-center mt-2">
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
