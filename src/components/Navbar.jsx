import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      id="home"
      className="w-full  flex items-center justify-between p-[2vw] px-[4vw]"
    >
      <h1 className="text-black text-3xl font-bold">Cook.</h1>
      <div className="sm:block hidden ">
        <ul className="flex items-center space-x-8">
          <li>
            <a
              href="#home"
              className=" font-bold text-base hover:text-[#ED8E00] transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#Aboutus"
              className=" font-bold text-base hover:text-[#ED8E00] transition-colors duration-300"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#Recipes"
              className="font-bold text-base hover:text-[#ED8E00] transition-colors duration-300"
            >
              Recipes
            </a>
          </li>
          <li>
            <a
              href="#Contest"
              className=" font-bold text-base hover:text-[#ED8E00] transition-colors duration-300"
            >
              Contest
            </a>
          </li>
          <li>
            <a
              href="#Blogs"
              className=" font-bold text-base hover:text-orange-500 transition-colors duration-300"
            >
              Blogs
            </a>
          </li>
        </ul>
      </div>

      <button className="shadow-lg shadow-gray bg-[#ED8E00] text-white px-4 py-2 rounded-md font-bold hover:bg-[#ed8e00c9] transition-colors duration-300">
        <ul>
          <li>
            <Link to="/add">Add New Recipe</Link>
          </li>
        </ul>
      </button>
    </div>
  );
};

export default Navbar;
