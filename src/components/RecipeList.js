import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import trashcan from "../assets/trashcan.svg";
import { projectFirestore } from "../firebase/config";
import "./RecipeList.css";

function RecipeList({ recipes }) {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  const handleClick = (id) => {
    // deleting a document by id from the recipes collection
    projectFirestore.collection("recipes").doc(id).delete();
  };
 
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`recipes/${recipe.id}`}>Cook This</Link>
          <img
            src={trashcan}
            alt="trashcan icon"
            className="delete"
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
