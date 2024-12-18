import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  addAllIngredients,
  editIngredient,
  deleteIngredient,
} from "./Api/IngredientsApi";
import { showData } from "./Api/RecipeApi";
import { MdOutlineDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function IngredientList() {
  const [dataIngredient, setDataIngredient] = useState(null);
  const [editForm, setEditForm] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({ name: "", recipeId: null });
  const [triggerFetch, setTriggerFetch] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchIngredient();
  }, [id, triggerFetch]);

  const fetchIngredient = async () => {
    try {
      const response = await showData(id);
      setDataIngredient(response);
    } catch (error) {
      console.error("Error fetching ingredient:", error);
    }
  };

  //   Handle form submission to add ingredient to list
  const handlerSubmit = async (event) => {
    event.preventDefault();
    const ingredientName = event.target.name.value; // Capture the name
    if (!ingredientName) {
      console.error("No ingredient name provided.");
      return;
    }

    try {
      const addedData = await addAllIngredients({ name: ingredientName }, id);
      setDataIngredient(addedData);
      event.target.reset(); // Clear the form
      setTriggerFetch(!triggerFetch); // Trigger the useEffect
      inputRef.current.blur();
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  const deletehandler = async (recipeId, ingredientId) => {
    try {
      await deleteIngredient(recipeId, ingredientId);
      setTriggerFetch(!triggerFetch); // Refetch the ingredients after deletion
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  const edithandler = async (id, recipeId) => {
    setEditForm(!editForm);
    let newdata = dataIngredient.ingredients.filter(
      (ingredient) => ingredient._id === recipeId
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
    const ingredientName = form.elements.name.value; // Use event.target.elements to access the input field

    if (!ingredientName) {
      console.error("No ingredient name provided.");
      return;
    }

    const recipeId = editData.recipeId;
    if (!recipeId) {
      console.error("Invalid recipe ID.");
      return;
    }

    try {
      const addedData = await editIngredient(
        { name: ingredientName },
        id,
        recipeId
      );

      // Check if allIngredient is an array and update accordingly
      setDataIngredient(
        Array.isArray(dataIngredient)
          ? dataIngredient.map((data) =>
              data._id === recipeId ? addedData : data
            )
          : []
      );

      // setAddIngredients(!addIngredients);
      form.reset(); // Clear the form
      setEditForm(!editForm); // Close edit form after submission
      setTriggerFetch(!triggerFetch); // Trigger the useEffect
      inputRef.current.blur();
    } catch (error) {
      console.error("Error editing ingredient:", error);
    }
  };

  return (
    <div className="container pt-4 ">
      <div className={screen.width >= "400" ? "col-6 offset-3 p-3" : "p-3"}>
        <FaArrowLeftLong
          onClick={() => navigate(`/details/${id}`)}
          className="absolute text-xl  top-5 left-100 cursor-pointer"
        />

        {editForm ? (
          <>
            <h1 className="text-3xl font-bold">Edit Ingredients</h1>
            <form onSubmit={handlerEditSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Ingredient:
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
            <h1 className="text-3xl font-bold">Add New Ingredients</h1>
            <form onSubmit={handlerSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Ingredients:
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
        <ul className="list-disc pl-5 pb-5">
          {dataIngredient?.ingredients?.length > 0 ? (
            dataIngredient.ingredients.map((item, index) =>
              item ? (
                <li key={item._id || index} className="list-item  gap-2 ">
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
            <p>No ingredients available</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default IngredientList;
