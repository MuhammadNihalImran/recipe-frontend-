import React from "react";
import { Link } from "react-router-dom";

const Card = ({ datas }) => {
  return (
    <div className="w-full sm:h-full bg-[#FFFBF5] flex items-center justify-center flex-col ">
      <h1 className="text-black text-3xl px-4 text-center font-bold sm:pt-[5rem]">
        Popular Recipes You Can Not Miss
      </h1>
      <p className="sm:w-[25rem] text-center py-[1rem]">
        From comfort food to exotic flavors, our featured recipes are sure to
        impress.
      </p>
      <div className="grid gap-4 sm:grid-cols-4">
        {datas.length === 0 ? (
          <p>No images uploaded yet.</p>
        ) : (
          datas.slice(0, 4).map((data, index) => {
            // Split the description into words
            const words = data.description.split(" ");

            // Limit the text to 20 words
            const textToShow =
              words.length > 10
                ? words.slice(0, 10).join(" ") + "..."
                : data.description;

            return (
              <div
                key={data.id || index}
                className="card rounded-lg"
                style={{ width: "18rem", height: "25rem", padding: "1rem" }}
              >
                <img
                  src={data.image.url}
                  className="card-img-top shadow-sm object-cover"
                  alt={data.image.filename}
                  style={{
                    borderRadius: "15px",
                    height: "12rem",
                  }}
                />
                <div className="card-body p-0">
                  <h5 className="card-title text-black text-xl font-bold pt-[1rem]">
                    {data.title}
                  </h5>
                  <p className="card-text pb-[1rem]">{textToShow}</p>
                  <Link
                    to={`/details/${data._id}`}
                    className="w-[90%] btn mt-auto font-bold border-1 border-black hover:bg-[#ED8E00] hover:border-none hover:text-white"
                    style={{
                      position: "absolute",
                      bottom: "20px", // Space from the bottom of the card
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    See Full Details
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Card;
