import React, { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function RecipeCollection({ data, index }) {
  const words = data.description.split(" ");

  // Limit the text to 20 words
  const textToShow =
    words.length > 10 ? words.slice(0, 10).join(" ") + "..." : data.description;
  return (
    <>
      <div
        key={data.id || index}
        className="card rounded-lg hover:bg-orange-500 cursor-pointer"
        style={{ width: "18rem", height: "25rem", padding: "1rem" }}
      >
        <Link to={`/details/${data._id}`}>
          <img
            src={data.image.url}
            className="card-img-top shadow-sm object-cover"
            alt={data.image.filename}
            style={{
              borderRadius: "15px", // You can simplify this
              height: "12rem",
              width: "100%", // Ensure it takes full width
            }}
          />
        </Link>
        <div className="card-body p-0">
          <h5 className="card-title text-black text-xl font-bold pt-[1rem]">
            {data.title}
          </h5>
          <p className="card-text pb-[1rem]">{textToShow}</p>
          <hr />
          <div className="flex items-center justify-between">
            {/* Use <span> instead of <li> here */}
            <span>30 Min</span>
            <span>Easy</span>
            <span>4.5 Ratings</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeCollection;
