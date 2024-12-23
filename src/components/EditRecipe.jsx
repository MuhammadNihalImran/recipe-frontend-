import React, { useRef, useContext, useEffect, useState } from "react";
import { editRecipeData } from "../components/Api/RecipeApi";
import { useLocation, useNavigate } from "react-router-dom";
import { RecipeContext } from "./contextApi/RecipeProvider";
import { FaArrowLeftLong } from "react-icons/fa6";

const EditRecipe = ({ setUploadedData }) => {
  const { datas, setDatas } = useContext(RecipeContext);
  const [newdata, setNewData] = useState({});
  const [image, setImage] = useState(null); // New image file if uploaded
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state;
  const inputRef = useRef(null);

  useEffect(() => {
    if (!datas.length) {
      const fetchedData = JSON.parse(localStorage.getItem("recipes")) || [];
      setDatas(fetchedData);
    }

    const recipe = datas.find((data) => data?._id === id);
    if (recipe) {
      setNewData(recipe);
    } else {
      console.warn(`Recipe with ID ${id} not found.`);
    }
  }, [id, datas, setDatas]);
  // useEffect(() => {
  //   if (datas.length === 0) {
  //     const fetchedData = JSON.parse(localStorage.getItem("recipes"));
  //     setDatas(fetchedData);
  //   }
  //   const recipe = datas.find((data) => data._id === id);
  //   if (recipe) {
  //     setNewData(recipe);
  //   }
  // }, [id, datas, setDatas]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", newdata.title); // Append title
    formData.append("description", newdata.description); // Append description

    // Append new image if uploaded, otherwise retain the previous image URL
    if (image) {
      formData.append("image", image); // Appending the selected image file
    } else if (newdata?.image?.url) {
      formData.append("imageUrl", newdata.image.url); // Retaining the previous image URL
    }

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    try {
      const addedData = await editRecipeData(id, formData);
      console.log("Updated Recipe Data:", addedData);

      if (!addedData || !addedData._id) {
        // Fallback: use the existing `id`
        console.warn(
          "Updated data missing _id, using existing id as fallback."
        );
        addedData._id = id;
      }

      setUploadedData(addedData);

      // Update the context state
      setDatas((prevDatas) =>
        prevDatas.map((data) =>
          data._id === id ? { ...data, ...addedData } : data
        )
      );

      navigate(`/details/${id}`); // Navigate to recipe details
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const handleImageChange = (file) => {
    setImage(file); // Set new image file
  };

  return (
    <div className="container pt-5 relative ">
      <div className={screen.width >= "400" ? "col-6 offset-3 p-3" : "p-3"}>
        <FaArrowLeftLong
          onClick={() => navigate(`/details/${id}`)}
          className="absolute text-xl  top-10 cursor-pointer"
        />
        <h1 className="text-3xl font-bold">Edit Recipe</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={newdata.title || ""}
              onChange={(e) =>
                setNewData({ ...newdata, title: e.target.value })
              }
              placeholder="Enter Title"
              required
              className="form-control"
              ref={inputRef}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              value={newdata.description || ""}
              onChange={(e) =>
                setNewData({ ...newdata, description: e.target.value })
              }
              placeholder="Enter description"
              required
              className="form-control"
              ref={inputRef}
            ></textarea>
          </div>

          {/* Show the current image if it exists */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Current Image
            </label>
            {newdata?.image?.url && (
              <div className="mb-2">
                <img
                  src={newdata.image.url}
                  alt="Current recipe"
                  style={{ width: "20%", height: "auto" }}
                />
              </div>
            )}
            <label htmlFor="image" className="form-label">
              Upload New Image
            </label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={(e) => handleImageChange(e.target.files[0])}
              ref={inputRef}
            />
          </div>

          <button type="submit" className="btn btn-dark add-btn mt-2">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
