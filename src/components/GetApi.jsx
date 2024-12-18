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
      // Ensure response is an array
      setDatas(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching images:", error);
      setDatas([]); // Fallback to an empty array in case of an error
    }
  };

  // Scroll page and show button
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
      <div className="Contest py-[5rem]  h-[80vh]">
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
          From quick weeknight dinner to elaborate weekend projects, we have
          recipes to fit every lifestyle and taste.
        </p>
        <div className="grid gap-4 sm:grid-cols-4 py-5">
          {Array.isArray(datas) && datas.length === 0 ? (
            <p>No images uploaded yet.</p>
          ) : (
            datas
              .slice(0, 4)
              .map((data, index) => (
                <RecipeCollection
                  key={`${data.id || index}`}
                  data={data}
                  index={index}
                />
              ))
          )}
        </div>
        <Link to={`/AllRecipes`}>
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
