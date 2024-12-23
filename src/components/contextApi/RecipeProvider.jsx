import React, { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [datas, setDatas] = useState(() => {
    // Try to get stored data from localStorage
    try {
      const savedData = localStorage.getItem("recipes");
      return savedData ? JSON.parse(savedData) : []; // Default to empty array if no data or invalid
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return []; // Fallback to empty array if there's an error with localStorage
    }
  });

  useEffect(() => {
    if (Array.isArray(datas)) {
      console.log("Saving updated datas to localStorage:", datas);
      localStorage.setItem("recipes", JSON.stringify(datas));
    }
  }, [datas]);

  return (
    <RecipeContext.Provider value={{ datas, setDatas }}>
      {children}
    </RecipeContext.Provider>
  );
};
