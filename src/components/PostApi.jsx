import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const PostApi = ({ setUploadedData, addData }) => {
  // Correctly receiving the prop
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (!formData.get("image")) {
      console.error("No file selected.");
      return;
    }

    try {
      const addedData = await addData(formData);
      setUploadedData(addedData); // Using the prop correctly here
      inputRef.current.blur();
      navigate("/"); // Navigate back to the homepage after successful upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="container pt-4 ">
      <div className={screen.width >= "400" ? "col-6 offset-3 p-3" : "p-3"}>
        <h1 className="text-3xl font-bold">Create New Recipes</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
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
              placeholder="Enter description"
              required
              className="form-control"
              ref={inputRef}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image Link
            </label>
            <input type="file" name="image" required className="form-control" />
          </div>
          <button type="submit" className="btn btn-dark add-btn mt-2">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostApi;
