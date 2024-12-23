import axios from "axios";

const API_URL =
  "https://backend-recipe.netlify.app/.netlify/functions/api/recipes";

export const getAllData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const showData = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addData = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:");
    throw error; // rethrow the error to handle it in the calling function
  }
};

export const deleteRecipe = async (id) => {
  try {
    console.log("api delete id: ", id);
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Recipe:", error);
    throw error;
  }
};

export const editRecipeData = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.updatedRecipe;
  } catch (error) {
    console.error("Error uploading recipe:", error);
    throw error; // rethrow the error to handle it in the calling function
  }
};

// export const editImages = async (id, formData) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data.updatedImage; // Return the updated image data
//   } catch (error) {
//     console.error("Error editing image:", error);
//     throw error;
//   }
// };
