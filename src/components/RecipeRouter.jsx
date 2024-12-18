import React, { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GetApi from "./GetApi";
import PostApi from "./PostApi";
import DetailsRecipe from "./DetailsRecipe";
import { getAllData, addData } from "./Api/RecipeApi";
import { RecipeProvider } from "./contextApi/RecipeProvider";
import EditRecipe from "./EditRecipe";
import Instractions from "./Instractions";
import Ingredient from "./Ingredients";
import AllRecipes from "./AllRecipes";

const RecipeRouter = () => {
  const [uploadedData, setUploadedData] = useState(null); // This should be named correctly

  return (
    <div>
      <RecipeProvider>
        <Routes>
          <Route
            path="/"
            element={
              <GetApi uploadedData={uploadedData} getAllData={getAllData} />
            }
          />
          <Route
            path="/add"
            element={
              <PostApi setUploadedData={setUploadedData} addData={addData} />
            }
          />

          <Route
            path="/Edit"
            element={<EditRecipe setUploadedData={setUploadedData} />}
          />
          <Route path="/AllRecipes" element={<AllRecipes />} />

          <Route path="/details/:id" element={<DetailsRecipe />} />
          <Route path="/instraction/:id" element={<Instractions />} />
          <Route path="/ingredient/:id" element={<Ingredient />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </RecipeProvider>
    </div>
  );
};

export default RecipeRouter;
