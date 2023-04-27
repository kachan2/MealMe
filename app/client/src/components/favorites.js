import React, { useState, useEffect } from "react";
import axios from "axios";
import {AiOutlineDelete} from "react-icons/ai";
import LoadingSpinner from "./functionalities/spinner.js";

import "./favorites.css";

const Favorites = ({token}) => {
  const [recipes, setRecipes] = useState();
  const [loaded, setLoaded] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (!loaded) {
      axios.get(`http://localhost:8080/favorites-select/${token}`, {
          mode: "no-cors"
      }).then((response) => {console.log(response); setRecipes(response.data);})
      setLoaded(true);
    }
  })

  function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }

  const renderRecipeDetails = () => {
    if (!selectedRecipe) return null;
    const steps = selectedRecipe.Instructions.split("\n");
      const numberedSteps = steps.map((step, index) => (
      <div key={index}>
        {index + 1}. {step.trim()}
      </div>
    ));
  
    return (
      <div className="recipe-details2">
        <button className="back-btn" onClick={() => setSelectedRecipe(null)}>
          Back to Favorites
        </button>
        <h2>{selectedRecipe.RecipeName}</h2>
        <div>Time: {selectedRecipe.Time}</div>
        <div>Number of Steps: {selectedRecipe.NumberOfSteps}</div>
        <div>Instructions:</div>
        <div>{numberedSteps}</div>
        <div className="heart-icon2">&#x2764;</div>
        <button className="delete-btn" onClick={() => {console.log("to delete: ", selectedRecipe.RecipeId);
                                                      var index = functiontofindIndexByKeyValue(recipes, "RecipeId", selectedRecipe.RecipeId);
                                                      recipes.splice(index, 1);
                                                      axios.get(`http://localhost:8080/favorites-delete/${token}/${selectedRecipe.RecipeId}`, {
                                                              mode: "no-cors"
                                                          }).then((response) => {console.log(response);});
                                                          setSelectedRecipe(null);
                                                      }}>
          <AiOutlineDelete className="trash"/>
        </button>
      </div>
    );
  };
  

  const renderRecipeList = () => {
    if (!recipes) return <LoadingSpinner />;
    return (
      <div className="recipe-grid">
        {Array.from(recipes).map((recipe) => {
          if (recipe.RecipeName !== 'RecipeName') {
            return (
              <div className="recipe-item" key={recipe.RecipeName} onClick={() => setSelectedRecipe(recipe)}>
                <div className="recipe-name">{recipe.RecipeName}</div>
                <div className="recipe-details">
                  <p>Time: {recipe.Time}</p>
                  <p>Number of Steps: {recipe.NumberOfSteps}</p>
                  <div className="heart-icon">&#x2764;</div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
  
  
  

  return (
    <div className="favorites-container">
      {selectedRecipe ? renderRecipeDetails() : renderRecipeList()}
    </div>
  );
}

export default Favorites;