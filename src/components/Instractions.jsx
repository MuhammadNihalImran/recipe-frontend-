import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { showData } from "./Api/RecipeApi";
import {
  addAllInstractions,
  deleteInstraction,
  editInstraction,
} from "./Api/InstractionsApi";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const Instractions = () => {
  const [dataInstraction, setDataInstraction] = useState(null);
  const [editForm, setEditForm] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({ name: "", recipeId: null });
  const [triggerFetch, setTriggerFetch] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchInstraction();
  }, [id, triggerFetch]);

  const fetchInstraction = async () => {
    try {
      const response = await showData(id);
      setDataInstraction(response);
    } catch (error) {
      console.error("Error fetching instraction:", error);
    }
  };

  //   Handle form submission to add instraction to list
  const handlerSubmit = async (event) => {
    event.preventDefault();
    const instractionName = event.target.name.value; // Capture the name
    if (!instractionName) {
      console.error("No instraction name provided.");
      return;
    }

    try {
      const addedData = await addAllInstractions({ name: instractionName }, id);
      setDataInstraction(addedData);
      event.target.reset(); // Clear the form
      setTriggerFetch(!triggerFetch); // Trigger the useEffect
      inputRef.current.blur();
    } catch (error) {
      console.error("Error adding instraction:", error);
    }
  };

  const deletehandler = async (recipeId, instractionId) => {
    try {
      await deleteInstraction(recipeId, instractionId);
      setTriggerFetch(!triggerFetch); // Refetch the instraction after deletion
    } catch (error) {
      console.error("Error deleting instraction:", error);
    }
  };

  const edithandler = async (id, recipeId) => {
    setEditForm(!editForm);
    let newdata = dataInstraction.instractions.filter(
      (item) => item._id === recipeId
    );

    setEditData({ name: newdata[0].name, recipeId: recipeId });
  };

  const onChangeHandler = useCallback(
    (e) => {
      setEditData({ ...editData, name: e.target.value });
    },
    [editData]
  );

  const handlerEditSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const instractionName = form.elements.name.value; // Use event.target.elements to access the input field

    if (!instractionName) {
      console.error("No instraction name provided.");
      return;
    }

    const recipeId = editData.recipeId;
    if (!recipeId) {
      console.error("Invalid recipe ID.");
      return;
    }

    try {
      const addedData = await editInstraction(
        { name: instractionName },
        id,
        recipeId
      );

      // Check if allInstraction is an array and update accordingly
      setDataInstraction(
        Array.isArray(dataInstraction)
          ? dataInstraction.map((data) =>
              data._id === recipeId ? addedData : data
            )
          : []
      );

      form.reset(); // Clear the form
      setEditForm(!editForm); // Close edit form after submission
      setTriggerFetch(!triggerFetch); // Trigger the useEffect
      inputRef.current.blur();
    } catch (error) {
      console.error("Error editing instraction:", error);
    }
  };

  return (
    <div className="container pt-4 ">
      <div
        className={
          screen.width >= "400 "
            ? "col-6 offset-3 p-3 realtive"
            : "p-3 relative"
        }
      >
        <FaArrowLeftLong
          onClick={() => navigate(`/details/${id}`)}
          className={
            screen.width >= "400 "
              ? "absolute text-xl  top-5 left-100 cursor-pointer"
              : "absolute text-xl  top-0 left-100 cursor-pointer"
          }
        />

        {editForm ? (
          <>
            <h1 className="text-3xl font-bold">Edit Instractions</h1>
            <form onSubmit={handlerEditSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Instraction:
                </label>
                <textarea
                  name="name"
                  placeholder="Enter Instruction"
                  required
                  className="form-control"
                  // value={editData.name || ""}
                  value={editForm ? editData.name || "" : ""}
                  onChange={onChangeHandler}
                  ref={inputRef}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-dark add-btn mt-2">
                Save
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Add New Instractions</h1>
            <form onSubmit={handlerSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Instractions:
                </label>
                <textarea
                  name="name"
                  placeholder="Enter Instruction"
                  required
                  className="form-control"
                  ref={inputRef}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-dark add-btn mt-2">
                Add
              </button>
            </form>
          </>
        )}

        <hr className="my-4 " />
        <ul className="list-decimal pl-5 pb-5 ">
          {dataInstraction?.instractions?.length > 0 ? (
            dataInstraction.instractions.map((item, index) =>
              item ? (
                <li key={item._id || index} className="list-item  gap-2">
                  <div className="flex items-center  gap-3">
                    {item.name}
                    <span className="flex gap-2">
                      <MdOutlineDelete
                        onClick={() => deletehandler(id, item._id)}
                        className="cursor-pointer"
                      />
                      <MdEdit
                        onClick={() => edithandler(id, item._id)}
                        className="cursor-pointer"
                      />
                    </span>
                  </div>
                </li>
              ) : null
            )
          ) : (
            <p>No instraaction available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Instractions;
