import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import { RecipeProvider } from "./components/contextApi/RecipeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <RecipeProvider> */}
      <App />
      {/* </RecipeProvider> */}
    </BrowserRouter>
  </StrictMode>
);
