import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, showData } from "./Api/RecipeApi";
import { deleteIngredient } from "./Api/IngredientsApi";
import { MdOutlineDelete } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const DetailsRecipe = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIngredient();
  }, [id, triggerFetch]); // Ensure that it refetches when id or triggerFetch changes

  const fetchIngredient = async () => {
    try {
      const response = await showData(id);
      setRecipeDetails(response);
    } catch (error) {
      console.error("Error fetching showData:", error);
    }
  };

  const deleteHanlderRecipe = async (id) => {
    await deleteRecipe(id);
    navigate("/");
  };

  const editHandlerRecipe = (id) => {
    navigate("/Edit", { state: id });
  };

  const deletehandler = async (recipeId, ingredientId) => {
    try {
      await deleteIngredient(recipeId, ingredientId);
      setTriggerFetch(!triggerFetch); // Refetch the ingredients after deletion
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  if (!recipeDetails) return <p>Loading...</p>;

  return (
    <div className="container flex items-center justify-center sm:min-h-[60vh] min-h-[100vh]">
      <div
        key={recipeDetails.id}
        className="card rounded-lg sm:w-[50vw] p-[1rem] relative"
      >
        <FaArrowLeftLong
          onClick={() => navigate("/")}
          className="absolute text-xl left-2 top-0 cursor-pointer"
        />
        <img
          src={recipeDetails.image.url}
          className="card-img-top shadow-sm object-cover"
          alt={recipeDetails.image.filename}
          style={{ borderRadius: "15px", height: "12rem" }}
        />
        <div className="card-body p-0">
          <h5 className="card-title text-black text-3xl font-bold pt-[1rem]">
            {recipeDetails.title}
          </h5>
          <p className="card-text pb-[1rem]">{recipeDetails.description}</p>
        </div>
        <hr />
        <ul className="list-disc pl-5 pb-5 ">
          {recipeDetails?.ingredients?.length > 0 ? (
            recipeDetails.ingredients.map((item, index) =>
              item ? (
                <li key={item._id || index} className="list-item  gap-2">
                  <div className="flex items-center  gap-3">
                    {item.name}
                    <span className="flex gap-2">
                      <MdOutlineDelete
                        onClick={() => deletehandler(id, item._id)}
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
        <hr />
        <ul className="list-decimal pl-5 pb-5 ">
          {recipeDetails?.instractions?.length > 0 ? (
            recipeDetails.instractions.map((item, index) =>
              item ? (
                <li key={item._id || index} className="list-item ">
                  <div className="flex items-center  gap-3">
                    {item.name}
                    <span className="flex gap-2">
                      <MdOutlineDelete
                        onClick={() => deletehandler(id, item._id)}
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
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center justify-center gap-2">
            <button
              className="whitespace-nowrap px-2 py-2 shadow-lg shadow-gray bg-[#ED8E00] text-white rounded-md font-bold hover:bg-[#ed8e00c9] transition-colors duration-300"
              onClick={() => navigate(`/ingredient/${id}`)}
            >
              Add Ingredients
            </button>
            <button
              className="whitespace-nowrap px-2 py-2 shadow-lg shadow-gray bg-[#ED8E00] text-white rounded-md font-bold hover:bg-[#ed8e00c9] transition-colors duration-300"
              onClick={() => navigate(`/instraction/${id}`)}
            >
              Add Instructions
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              className="whitespace-nowrap px-2 py-2 shadow-lg shadow-gray bg-[#ED8E00] text-white rounded-md font-bold hover:bg-[#ed8e00c9] transition-colors duration-300"
              onClick={() => deleteHanlderRecipe(recipeDetails._id)}
            >
              <MdDeleteSweep />
            </button>
            <button
              className="whitespace-nowrap px-2 py-2 shadow-lg shadow-gray bg-[#ED8E00] text-white rounded-md font-bold hover:bg-[#ed8e00c9] transition-colors duration-300"
              onClick={() => editHandlerRecipe(recipeDetails._id)}
            >
              <FaEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsRecipe;
