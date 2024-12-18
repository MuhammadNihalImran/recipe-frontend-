import axios from "axios";

const API_URL = "http://localhost:3000/recipes";

export const getAllIngredients = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/ingredients`);
  return response.data;
};

export const addAllIngredients = async (formData, id) => {
  try {
    const response = await axios.post(
      `${API_URL}/${id}/ingredients/`,
      formData,
      {
        headers: {
          "Content-Type": "application/json", // Sending JSON instead of FormData
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding ingredient:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const deleteIngredient = async (id, recipeId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${id}/ingredients/${recipeId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    throw error;
  }
};

export const editIngredient = async (formData, id, recipeId) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}/ingredients/${recipeId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json", // Sending JSON instead of FormData
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding ingredient:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
