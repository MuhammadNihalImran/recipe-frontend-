import React, { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [datas, setDatas] = useState(() => {
    // Try to get stored data from localStorage
    const savedData = localStorage.getItem("recipes");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    // Save the data to localStorage whenever it changes
    localStorage.setItem("recipes", JSON.stringify(datas));
  }, [datas]);

  return (
    <RecipeContext.Provider value={{ datas, setDatas }}>
      {children}
    </RecipeContext.Provider>
  );
};
