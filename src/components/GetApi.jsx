import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Center from "./center";
import Card from "./Card";
import Swipercard from "./swipercards/Swipercard";
import Latest from "./Latest";
import RecipeCollection from "./RecipeCollection";
import Blog from "./Blog";
import Footer from "./Footer";
import { RecipeContext } from "./contextApi/RecipeProvider";

import { RiArrowUpDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const GetApi = ({ uploadedData, getAllData }) => {
  const { datas, setDatas } = useContext(RecipeContext);

  useEffect(() => {
    fetchImages();
  }, [uploadedData]);

  const fetchImages = async () => {
    try {
      const response = await getAllData();
      setDatas(response); // Update the context with new data
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Scroll page and show button logic
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <Navbar />

      <Center />
      <Card datas={datas} />

      <Swipercard datas={datas} />

      <div className="Contest py-[5rem] h-[80vh]">
        <Latest />
      </div>

      <div
        id="Recipes"
        className="w-full bg-[#FFFBF5] flex items-center justify-center flex-col py-5"
      >
        <h1 className="text-black text-3xl font-bold pt-[5rem]">
          Recipe Collection
        </h1>
        <p className="sm:w-[25rem] text-center py-[1rem]">
          From quick weeknight dinners to elaborate weekend projects, we have
          recipes to fit every lifestyle and taste.
        </p>
        <div className="grid gap-4 sm:grid-cols-4 py-5">
          {datas && datas.length > 0 ? (
            datas
              .filter((data) => data !== null && data !== undefined) // Filter out null/undefined entries
              .slice(0, 4)
              .map((data, index) => (
                <RecipeCollection
                  key={data._id || index} // Use _id for the key if it's available
                  data={data}
                  index={index}
                />
              ))
          ) : (
            <p>No images uploaded yet.</p>
          )}
        </div>

        <Link to="/AllRecipes">
          <button className="shadow-lg shadow-gray bg-[#ED8E00] text-white px-4 py-2 rounded-md font-bold hover:bg-[#ed8e00c9] transition-colors duration-300">
            See All Recipes
          </button>
        </Link>
      </div>

      <Blog />
      <Footer />

      {showButton && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-20 right-10 text-3xl shadow-lg shadow-gray bg-[#ED8E00] text-white rounded-full font-bold hover:bg-[#ed8e00c9] transition-colors duration-300 cursor-pointer"
        >
          <RiArrowUpDoubleFill />
        </div>
      )}
    </div>
  );
};

export default GetApi;
