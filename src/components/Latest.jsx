import React from "react";

const Latest = () => {
  return (
    <div
      id="Contest"
      className="flex items-center justify-between h-[60vh] sm:h-full px-5 relative "
    >
      <div className=" inset-y-0 left-0 z-10">
        <h1 className=" text-black sm:text-6xl font-bold pt-[5rem] whitespace-nowrap">
          Join Our Latest Contest
        </h1>

        <p className="sm:w-[25rem]  py-[1rem]">
          Discover new flaovers and cooking techniques with our diverse
          selection of cuision types.
        </p>
        <button className="shadow-lg shadow-gray bg-[#ED8E00] text-white px-4 py-2 rounded-md font-bold hover:bg-[#ed8e00c9] transition-colors duration-300">
          Explore Contest
        </button>
      </div>
      <img
        className="absolute inset-y-0 right-10"
        src="https://img.freepik.com/free-photo/baked-chicken-wings-asian-style-tomatoes-sauce-plate-top-view-copyspace_2829-17200.jpg?t=st=1725540171~exp=1725543771~hmac=b138986e03df6921115a909e81c1b8327402432e7e2ee7f4da9cd8916c112e95&w=1060"
        alt="contest"
      />
    </div>
  );
};

export default Latest;
