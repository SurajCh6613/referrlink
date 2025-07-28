import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="w-full h-full bg-gray-800">
      <div className=" flex flex-col p-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-4 mb-6">
          <div>
            <div className="w-full h-full p-2">
              <h3 className="text-white font-bold text-xl mb-3">RefferLink</h3>
              <p className="text-gray-400">
                Connecting talent with opportunity through professional
                referrals.
              </p>
            </div>
          </div>
          <div className="w-full h-full p-3">
            <h3 className="text-white font-semibold text-md mb-3">Company</h3>
            <div className="list-none text-gray-400 flex flex-col gap-3">
              <Link className="hover:text-white">
                <li>About Us</li>
              </Link>
              <Link className="hover:text-white">
                <li>Careers</li>
              </Link>
              <Link className="hover:text-white">
                <li>Blogs</li>
              </Link>
            </div>
          </div>
          <div className="w-full h-full p-3">
            <h3 className="text-white font-semibold text-md mb-3">Resources</h3>
            <div className="list-none text-gray-400 flex flex-col gap-3">
              <Link className="hover:text-white">
                <li>Help Center</li>
              </Link>
              <Link className="hover:text-white">
                <li>Referral Guide</li>
              </Link>
              <Link className="hover:text-white">
                <li>Community</li>
              </Link>
            </div>
          </div>
          <div className="w-full h-full p-3">
            <h3 className="text-white font-semibold text-md mb-3">Legal</h3>
            <div className="list-none text-gray-400 flex flex-col gap-3">
              <Link className="hover:text-white">
                <li>Privacy Policy</li>
              </Link>
              <Link className="hover:text-white">
                <li>Terms of Services</li>
              </Link>
              <Link className="hover:text-white">
                <li>Cookie Policy</li>
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 border-t border-t-gray-400 pt-8">
          &copy; 2025 ReferrLink. All right reserved.{" "}
        </p>
      </div>
    </section>
  );
};

export default Footer;
