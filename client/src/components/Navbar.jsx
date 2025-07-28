import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
const Navbar = () => {
  const navItems = (
    <>
      <Link
        to={"/"}
        className="hover:scale-105 duration-300"
      >
        <li className="list-none" onClick={() => setIsOpen(false)}>
          Home
        </li>
      </Link>
      <Link className="hover:scale-105 duration-300">
        <li className="list-none" onClick={() => setIsOpen(false)}>
          How it Works
        </li>
      </Link>
      <Link className=" hover:scale-105 duration-300">
        <li className="list-none" onClick={() => setIsOpen(false)}>
          Login
        </li>
      </Link>
      <Link className="hover:scale-105 duration-300">
        <li className="list-none" onClick={() => setIsOpen(false)}>
          Sign Up
        </li>
      </Link>
    </>
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex  justify-between px-4 py-1 items-center bg-indigo-500 shadow-md">
        <Link className="flex items-center w-12 h-12">
          <img src="/logo.png" alt="ReferrLink logo" />
          <h1 className="text-3xl">
            Referr<span className="text-white font-semibold">Link</span>{" "}
          </h1>
        </Link>
        <nav className="hidden sm:flex gap-12 font-semibold text-white">
          {navItems}
        </nav>

        {/* Mobile Navigation */}
        <button className="sm:hidden" onClick={toggleSidebar}>
          <MdOutlineMenu className="text-3xl text-white" />
        </button>
        <nav
          className={`absolute sm:hidden w-1/3 h-full top-0 right-0 bg-white  z-10 duration-300 ${
            isOpen ? `translate-x-0` : `translate-x-full`
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
