import React, { useState, useEffect } from "react";
import {ScrollView} from 'react-native';
import {AiOutlineDelete} from "react-icons/ai";
import axios from "axios";

import LoadingSpinner from "./functionalities/spinner.js";
import Recipe from "./searchPages/recipe2.js";

const Favorites = ({token}) => {
  const [recipes, setRecipes] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(()=> {
    if (!loaded) {
      axios.get(`http://localhost:8080/favorites-select/${token}`, {
          mode: "no-cors"
      }).then((response) => {console.log(response); setRecipes(response.data);})
      setLoaded(true);
    }
  })

  return (
    <div>
      <div className="scroll">
          <ScrollView>
            {recipes ? 
                Array.from(recipes).map((recipe) => {
                  if (recipe.RecipeName !== 'RecipeName') {
                    return(
                      <div>
                       <Recipe 
                        key={recipe.RecipeId} 
                        recipeid={recipe.RecipeId} 
                        name={recipe.RecipeName} 
                        time={recipe.Time} 
                        steps={recipe.NumberOfSteps} 
                        userid={token} 
                        instruction={recipe.Instructions} />
                      </div>
                    );
                  }
                })
                :
                <LoadingSpinner/>
            }
          </ScrollView>
        </div>
    </div>
  );
}

export default Favorites;
