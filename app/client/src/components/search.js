import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";

const Search = () => {

  const [inputs, setInputs] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [toQuery, setToQuery] = useState("nothing");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clicked, setClicked] = useState(false);


  useEffect(() => {
    if (clicked) {
      axios.get(`http://localhost:8080/search/${toQuery}`, {
        mode: "no-cors"
      }).then((response) => {
        setRecipes(response.data);
      });
      setClicked(false);
    }
    
  },[clicked, setClicked, toQuery])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    setToQuery(inputs.query);
    setIsSubmitted(true);
    setClicked(true);
  }

  return(
    <div>
    <center>
    <form onSubmit={handleSubmit}>
        <input 
          id="input"
          type="text" 
          name="query" 
          placeholder="Search"
          value={inputs.query || ""} 
          onChange={handleChange}
        /> 
      <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
         <svg style={{width:"20px",height:"20px", viewBox:"0 0 24 24"}}><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
         </svg>
       </button>
    </form>
    </center>
    {isSubmitted && 
      Array.from(recipes).map((recipe) => {
        return(<><ul key={recipe.RecipeId}>{recipe.RecipeName}</ul></>);
      })
    }
    </div>
  )
}


export default Search;