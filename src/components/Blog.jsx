import React from "react";

const Blog = () => {
  return (
    <>
      <div
        id="Blogs"
        className="w-full flex items-center justify-center flex-col py-5"
      >
        <h1 className="text-black text-3xl font-bold">Latest Blog</h1>
        <p className="py-[1rem] text-center">
          From quick weeknight dinners to elaborate weekend projects.
        </p>

        <div className="container sm:flex-row flex-col flex justify-between sm:h-[80vh] w-full gap-4 pt-2 sm:px-4">
          {/* Left Section */}
          <div className="left w-full sm:w-[50%]">
            <img
              className="w-full h-[60%] object-cover rounded-lg cursor-pointer"
              src="https://plus.unsplash.com/premium_photo-1695302441138-f68978135eff?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Health food"
            />
            <h1 className="text-black text-3xl font-bold py-2">Health Food</h1>
            <p className="py-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut alias
              blanditiis eius ex. Vel culpa consequatur harum dolore doloribus?
              Officiis, repudiandae! Placeat expedita consectetur repellendus
              hic nihil eum ducimus dolor.
            </p>
            <p>12 Sep 2024</p>
          </div>

          {/* Right Section */}
          <div className="right sm:w-[50%] flex flex-col gap-2 overflow-hidden">
            {[1, 2, 3].map((_, index) => (
              <div className="w-full flex gap-4" key={index}>
                <img
                  className="w-[50%] h-[20vh] object-cover rounded-lg cursor-pointer"
                  src="https://plus.unsplash.com/premium_photo-1695302441138-f68978135eff?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Health food"
                />
                <div className="">
                  <h1 className="text-black text-2xl  font-bold">
                    Health Food
                  </h1>
                  <p className="py-2 sm:py-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem, aliquam.
                  </p>
                  <p>12 Sep 2024</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-4 sm:mt-0 shadow-lg shadow-gray bg-[#ED8E00] text-white px-4 py-2 rounded-md font-bold hover:bg-[#ed8e00c9] transition-colors duration-300">
          See More
        </button>
      </div>
    </>
  );
};

export default Blog;
