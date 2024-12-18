import React from "react";
import { Link } from "react-router-dom";

const Center = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 justify-center p-[2vw] sm:px-[4vw] px-[2vw]">
      <div className="flex flex-col items-start">
        <h1 className="text-black text-3xl sm:text-5xl font-bold">
          Cook Like a Pro with
        </h1>
        <h1 className="text-black text-3xl sm:text-5xl font-bold">
          Our Easy and Tasty
        </h1>
        <h1 className="text-black text-3xl sm:text-5xl font-bold">Recipes</h1>
        <p className="text-black sm:w-[30rem] w-full py-[2rem]">
          From quick and easy meals to gourmet delights, we have something for
          every taste and occasion.
        </p>
        <Link to={`/AllRecipes`}>
          <button className="shadow-lg shadow-gray bg-[#ED8E00] text-white px-4 py-2 rounded-md font-bold hover:bg-[#ed8e00c9] transition-colors duration-300">
            Explore All Recipes
          </button>
        </Link>
      </div>
      <div className="mt-8 sm:mt-0 flex justify-center sm:justify-end">
        <img
          src="./images/cook-removebg-preview.png"
          alt="Cook"
          className="w-full sm:w-auto h-auto -mt-8 sm:-mt-16"
        />
      </div>
    </div>
  );
};

export default Center;
