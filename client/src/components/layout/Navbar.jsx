// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
// import { useUser } from "../../context/UserContext";
// import BACKEND_API from "../../config/config";
// import axios from "axios";
// const Navbar = () => {
//   const { user, setUser } = useUser();
//   const [toggleProfile, setToggleProfile] = useState(false);
//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(`${BACKEND_API}/api/user/logout`, {
//         withCredentials: true,
//       });
//       setUser(null);
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const navItems = (
//     <>
//       <li
//         className="list-none hover:scale-105 duration-300"
//         onClick={() => setIsOpen(false)}
//       >
//         <Link to="/">Home</Link>
//       </li>
//       {user ? (
//         <li
//           className="list-none hover:scale-105 duration-300"
//           onClick={() => setIsOpen(false)}
//         >
//           <Link
//             to={`${
//               user.role === "junior" ? "/junior-dashboard" : "senior-dashboard"
//             }`}
//           >
//             Dashboard
//           </Link>
//         </li>
//       ) : (
//         <li
//           className="list-none hover:scale-105 duration-300"
//           onClick={() => setIsOpen(false)}
//         >
//           <Link to="/how-it-works">How it Works</Link>
//         </li>
//       )}
//       {user && user?.role === "junior" && (
//         <Link to="/find-senior">
//           <li className="list-none hover:scale-105 duration-300">
//             Find Senior
//           </li>
//         </Link>
//       )}
//       {user ? (
//         <div className="flex gap-1">
//           <button
//             onClick={() => setToggleProfile(!toggleProfile)}
//             className="relative cursor-pointer"
//           >
//             <p className="bg-indigo-200 hidden md:block w-12 h-12 rounded-full text-xl px-3 py-2">
//               {user?.avatar}
//             </p>
//             <div
//               className={`absolute w-42  h-16 top-12 right-2 rounded-sm bg-indigo-100 p-4 ${
//                 toggleProfile ? "block" : "hidden"
//               }`}
//             >
//               <div className="flex gap-2 flex-col">
//                 <Link to={"myProfile"}>My Profile</Link>
//               </div>
//             </div>
//           </button>

//           <li
//             className="list-none hover:scale-105 cursor-pointer duration-300 bg-red-400 py-2 px-3 rounded-md text-white"
//             onClick={() => {
//               setIsOpen(false);
//               handleLogout();
//             }}
//           >
//             Logout
//           </li>
//         </div>
//       ) : (
//         <li
//           className="list-none hover:scale-105 duration-300"
//           onClick={() => setIsOpen(false)}
//         >
//           <Link to="/login">Login/Sign Up</Link>
//         </li>
//       )}
//     </>
//   );

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <header className="flex  justify-between px-4 py-1 items-center bg-indigo-50 shadow-md">
//         <Link to={"/"} className="flex items-center w-12 h-12">
//           <img src="/logo.png" alt="ReferrLink logo" />
//           <h1 className="text-3xl">
//             Referr<span className="text-indigo-500 font-semibold">Link</span>{" "}
//           </h1>
//         </Link>
//         <nav className="hidden md:flex gap-12 items-center font-semibold text-indigo-500">
//           {navItems}
//         </nav>

//         {/* Mobile Navigation */}
//         <div className="md:hidden flex gap-2">
//           {user && (
//             <button
//               onClick={() => setToggleProfile(!toggleProfile)}
//               className="relative cursor-pointer"
//             >
//               <p className="bg-indigo-200  md:block w-8 h-8 rounded-full text-sm px-1 py-1">
//                 {user?.avatar}
//               </p>
//               <div
//                 className={`absolute w-[500%]  h-[200%] top-10 right-2 rounded-sm bg-indigo-100 p-4 ${
//                   toggleProfile ? "block" : "hidden"
//                 }`}
//               >
//                 <div className="flex gap-1 flex-col">
//                   <Link to={"myProfile"}>My Profile</Link>
//                 </div>
//               </div>
//             </button>
//           )}
//           <button className="md:hidden" onClick={toggleSidebar}>
//             <MdOutlineMenu className="text-3xl text-indigo-500" />
//           </button>
//         </div>
//         <nav
//           className={`absolute md:hidden w-[100%] h-full top-0 left-0 bg-white pt-10  z-10 duration-300 ${
//             isOpen ? `translate-x-0` : `-translate-x-full`
//           }`}
//         >
//           <button
//             onClick={() => setIsOpen(false)}
//             className="absolute top-2 right-2"
//           >
//             <MdOutlineClose className="text-3xl text-indigo-500" />
//           </button>
//           <ul className="flex flex-col items-center space-y-6 mt-10 font-semibold">
//             {navItems}
//           </ul>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;

import { Menu, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div onClick={()=>navigate('/')} className="flex items-center space-x-2 cursor-pointer">
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
            <a
              href="/how-it-works"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              How it Works
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              For Companies
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Success Stories
            </a>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
            >
              Get Started
            </button>
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
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              How it Works
            </a>
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              For Companies
            </a>
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              Success Stories
            </a>
            <button className="w-full py-2 text-blue-600 font-medium">
              Sign In
            </button>
            <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
