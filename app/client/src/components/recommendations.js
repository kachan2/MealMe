import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import axios from "axios";

import LoadingSpinner from './functionalities/spinner.js';
import Recipe from "./searchPages/recipe2.js";
import "./scroller.css";

const Recommendations = ({token}) =>{
  const [recipes, setRecipes] = useState([]);
  const [loaded, setLoaded] = useState(true);


  useEffect(()=> {
    if (loaded) {
      axios.get(`http://localhost:8080/recommend`, {
        mode: "no-cors"
      }).then((response) => {
        setRecipes(response.data);
      });
      setLoaded(false);
    }
    
  }, [loaded, setLoaded])


  return (
    <div className="scroll">
      <br></br><br></br>
      <ScrollView>
    {recipes ?
      Array.from(recipes).map((recipe) => {
        if (recipe.RecipeName !== "RecipeName") {
          return(<>
            <Recipe key={recipe.RecipeId} recipeid={recipe.RecipeId} name={recipe.RecipeName} time={recipe.Time} steps={recipe.NumberOfSteps} userid={token}></Recipe>
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
