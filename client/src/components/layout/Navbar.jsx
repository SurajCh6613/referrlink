import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import { useUser } from "../../context/UserContext";
import axios from "axios";
const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/logout",
        {
          withCredentials: true,
        }
      );
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const navItems = (
    <>
      <li
        className="list-none hover:scale-105 duration-300"
        onClick={() => setIsOpen(false)}
      >
        <Link to="/">Home</Link>
      </li>
      {user ? (
        <li
          className="list-none hover:scale-105 duration-300"
          onClick={() => setIsOpen(false)}
        >
          <Link
            to={`${
              user.role === "junior" ? "/junior-dashboard" : "senior-dashboard"
            }`}
          >
            Dashboard
          </Link>
        </li>
      ) : (
        <li
          className="list-none hover:scale-105 duration-300"
          onClick={() => setIsOpen(false)}
        >
          <Link to="/how-it-works">How it Works</Link>
        </li>
      )}
      {user && user?.role === "junior" && (
        <Link to="/find-senior">
          <li className="list-none hover:scale-105 duration-300">
            Find Senior
          </li>
        </Link>
      )}
      {user ? (
        <li
          className="list-none hover:scale-105 cursor-pointer duration-300 bg-red-400 py-1 px-2 rounded-md text-white"
          onClick={() => {
            setIsOpen(false);
            handleLogout();
          }}
        >
          Logout
        </li>
      ) : (
        <li
          className="list-none hover:scale-105 duration-300"
          onClick={() => setIsOpen(false)}
        >
          <Link to="/login">Login/Sign Up</Link>
        </li>
      )}
    </>
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex  justify-between px-4 py-1 items-center bg-indigo-50 shadow-md">
        <Link to={"/"} className="flex items-center w-12 h-12">
          <img src="/logo.png" alt="ReferrLink logo" />
          <h1 className="text-3xl">
            Referr<span className="text-indigo-500 font-semibold">Link</span>{" "}
          </h1>
        </Link>
        <nav className="hidden sm:flex gap-12 font-semibold text-indigo-500">
          {navItems}
        </nav>

        {/* Mobile Navigation */}
        <button className="sm:hidden" onClick={toggleSidebar}>
          <MdOutlineMenu className="text-3xl text-indigo-500" />
        </button>
        <nav
          className={`absolute sm:hidden w-1/2 h-full top-0 left-0 bg-white  z-10 duration-300 ${
            isOpen ? `translate-x-0` : `-translate-x-full`
          }`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2"
          >
            <MdOutlineClose className="text-3xl text-indigo-500" />
          </button>
          <ul className="flex flex-col items-center space-y-4 mt-10 font-semibold">
            {navItems}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
