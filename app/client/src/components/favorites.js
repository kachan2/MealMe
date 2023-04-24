import React, { useState, useEffect } from "react";
import {ScrollView} from 'react-native';
import axios from "axios";

import LoadingSpinner from "./functionalities/spinner.js";

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
                      <>
                      {recipe.RecipeName} <br/>
                      </>
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
