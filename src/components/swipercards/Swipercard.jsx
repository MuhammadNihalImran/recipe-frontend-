import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Swipercard.css";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Swipercard = ({ datas }) => {
  return (
    <>
      <div id="Aboutus" className="center flex ">
        <h1 className="text-black text-3xl font-bold pt-0 sm:pt-[5rem] mx-2">
          Explore by Cuisine Type
        </h1>
        <p className="sm:w-[20rem] sm:w-[25rem] text-center py-[2rem]">
          Discover new flavors and cooking techniques with our diverse selection
          of cuisine types.
        </p>
        <Swiper
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          modules={[Pagination]}
          breakpoints={{
            640: { slidesPerView: 4 },
          }}
        >
          {datas.length === 0 ? (
            <p>No images uploaded yet.</p>
          ) : (
            // eslint-disable-next-line react/jsx-key
            //  <Link
            datas.map((data, index) => {
              // Log each `data` object to verify its structure
              console.log("Data at index", data._id);

              return (
                <SwiperSlide key={index}>
                  <Link to={`/details/${data?._id}`}>
                    <img
                      className="cursor-pointer"
                      src={data?.image?.url}
                      alt={data?.image?.filename}
                    />
                  </Link>
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>
    </>
  );
};

export default Swipercard;
