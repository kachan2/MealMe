import React, {useState, useEffect} from 'react';
import axios from "axios";

const Recommendations = () =>{
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
    <div>
    {
      Array.from(recipes).map((recipe) => {
        if (recipe.RecipeName !== "RecipeName") {
          return(<><ul key={recipe.RecipeId}>
            <b>Name:</b> {recipe.RecipeName} <br></br>
            <b>Time Required:</b> {recipe.Time} minutes &nbsp; <b>Number of Steps:</b> {recipe.NumberOfSteps}<br></br>
          </ul></>);
        }
        return(<></>)
      })
    }
    </div>
  );
}

export default Recommendations;
