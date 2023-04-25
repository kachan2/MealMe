import React, { useState, useEffect } from "react";
import {ScrollView} from 'react-native';
import axios from "axios";

import LoadingSpinner from "./functionalities/spinner.js";
const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/favorites`, {
      mode: "no-cors"
    })
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
}

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
      {favorites.map((favorite) => (
        <ul key={favorite.id}>
          <b>Name:</b> {favorite.RecipeName} <br></br>
          <b>Time Required:</b> {favorite.Time} minutes &nbsp; <b>Number of Steps:</b> {favorite.NumberOfSteps}<br></br>
        </ul>
      ))}
    </div>
  );
};

export default Favorite;
