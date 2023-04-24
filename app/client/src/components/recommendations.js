import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import axios from "axios";

import LoadingSpinner from './functionalities/spinner.js';
import Recipe from "./searchPages/recipe.js";
import "./scroller.css";

const Recommendations = ({token}) =>{
  const [recipes, setRecipes] = useState();
  const [loaded, setLoaded] = useState(true);


  useEffect(()=> {
    if (loaded && token != undefined) {
      axios.get(`http://localhost:8080/recommend/${token}`, {
        mode: "no-cors"
      }).then((response) => {
        setRecipes(response.data[0]);
      });
      setLoaded(false);
    }
    
  }, [loaded, setLoaded])


  return (
    <div className="scroll">
      <br></br><br></br>
      <ScrollView>
    {recipes && token ?
      Array.from(recipes).map((recipe) => {
        if (recipe.RecipeName !== "RecipeName") {
          console.log(recipe);
          return(<>
            <Recipe key={recipe.RecipeId} recipeid={recipe.RecipeId} name={recipe.RecipeName} time={recipe.Time} steps={recipe.NumberOfSteps} userid={token} instruction={recipe.Instructions}></Recipe>
          </>);
        }
        return(<></>)
      })
      :
      <LoadingSpinner className="spinner"/>
    }
    </ScrollView>
    </div>
    
  );
}

export default Recommendations;
