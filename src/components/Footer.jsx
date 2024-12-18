import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="bg-black h-[80vh] flex flex-col justify-between text-white">
        {/* Main Content */}
        <div className="flex items-center justify-center flex-col h-full px-4">
          <h1 className="font-bold text-4xl sm:text-5xl">cook.</h1>
          <p className="w-full sm:w-[50vw] lg:w-[32vw] text-center py-5 text-sm sm:text-base">
            From quick and easy meals to gourmet delights. We have something for
            every taste and occasion.
          </p>

          {/* Navigation Links */}
          <div className="border-t-2 border-gray-500 w-full sm:w-[50%] py-5">
            <ul className="flex items-center justify-center space-x-6 sm:space-x-9">
              <li>
                <a
                  href="#Aboutus"
                  className="font-bold text-sm sm:text-base hover:text-[#ED8E00] transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#Recipes"
                  className="font-bold text-sm sm:text-base hover:text-[#ED8E00] transition-colors duration-300"
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  href="#Contest"
                  className="font-bold text-sm sm:text-base hover:text-[#ED8E00] transition-colors duration-300"
                >
                  Contest
                </a>
              </li>
              <li>
                <a
                  href="#Blogs"
                  className="font-bold text-sm sm:text-base hover:text-orange-500 transition-colors duration-300"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer className="font-bold border-t-2 border-gray-500 h-[8vh] flex items-center justify-between px-[5vw] sm:px-[10vw]">
          <h2 className="text-sm sm:text-base">copyright &#169; 2023</h2>
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <FaFacebook className="hover:text-orange-500" />
            <FaInstagram className="hover:text-orange-500" />
            <FaTwitterSquare className="hover:text-orange-500" />
            <FaYoutube className="hover:text-orange-500" />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
