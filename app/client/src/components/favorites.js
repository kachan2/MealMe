import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div>
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
