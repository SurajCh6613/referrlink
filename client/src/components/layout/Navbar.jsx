import { Menu, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import BACKEND_API from "../../config/config";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_API}/api/user/logout`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
      toast.success("Logged out successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed.");
    }
  };

  const navItems = (
    <>
      <a
        href="/how-it-works"
        className="text-gray-700 hover:text-blue-600 font-medium"
      >
        How it Works
      </a>

      <a
        href="find-senior"
        className="text-gray-700 hover:text-blue-600  font-medium"
      >
        Find Referrals
      </a>
      {user && (
        <button
          onClick={() => {
            navigate("/myProfile");
            setIsMenuOpen(false);
          }}
          className="px-4 py-2 text-gray-700  hover:text-blue-700 font-medium  cursor-pointer"
        >
          My Profile
        </button>
      )}
      {user && (
        <button
          onClick={() => {
            user.role === "junior"
              ? navigate("junior-dashboard")
              : navigate("senior-dashboard");
            setIsMenuOpen(false);
          }}
          className="px-4 py-2 text-gray-700 hover:text-blue-700  duration-200 font-medium cursor-pointer"
        >
          Dashboard
        </button>
      )}

      <button
        onClick={() => {
          !user ? navigate("/login") : handleLogout();
          setIsMenuOpen(false);
        }}
        className={`px-6 py-2.5  text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium cursor-pointer ${
          user
            ? "bg-gradient-to-r from-red-600 to-pink-600"
            : "bg-gradient-to-r from-blue-600 to-indigo-600"
        }`}
      >
        {!user ? "Sign In" : "Logout"}
      </button>
    </>
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ReferrLink
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-100 rounded-b-xl pb-2">
          <div className="px-4 py-4 space-y-3 flex flex-col justify-center items-center">
            {navItems}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
