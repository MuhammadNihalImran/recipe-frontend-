import axios from "axios";

const API_URL = "https://backend-recipe.netlify.app/.netlify/functions/api/recipes";

export const getAllInstractions = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/instraction`);
  return response.data;
};

export const addAllInstractions = async (formData, id) => {
  try {
    const response = await axios.post(
      `${API_URL}/${id}/instraction/`,
      formData,
      {
        headers: {
          "Content-Type": "application/json", // Sending JSON instead of FormData
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding instraction:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const deleteInstraction = async (id, recipeId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${id}/instraction/${recipeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting instraction:", error);
    throw error;
  }
};

export const editInstraction = async (formData, id, recipeId) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}/instraction/${recipeId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json", // Sending JSON instead of FormData
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding instraction:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
