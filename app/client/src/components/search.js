import React, { useState, useEffect } from "react";
import axios from "axios";

import "./search.css";
import StepSlider from "./sliders/stepSlider.js"
import TimeSlider from "./sliders/timeSlider.js"

const SearchBar = ({inputs, setInputs, handleSubmit}) => {

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
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
    {/* {isSubmitted && 
      Array.from(recipes).map((recipe) => {
        return(<><ul key={recipe.RecipeId}><b>{recipe.RecipeName}</b><br></br> Time: {recipe.Time} Steps: {recipe.NumberOfSteps}</ul></>);
      })
    } */}
    </div>

  )
}


const Filter = ({setTime, setSteps, easy, setEasy, handleSubmit}) => {

  const handleCheck = () => {
    setEasy(!easy);
  };

  return (
    <div>
      <div className = "eclipse"></div>
      <div className="filter"> 
        <h4>Filters</h4>
        <div className = "easy">
          <form onSubmit = {handleSubmit}>
          <input type = "checkbox"
                  id = "easy"
                  name = "easy"
                  value = {easy}
                  checked = {easy}
                  onChange = {handleCheck}
                />
          <label htmlFor="easy">Easy Recipes</label> <br></br><br></br>
          <StepSlider setSteps={setSteps} /> <br></br>
          <TimeSlider setTime={setTime} />
          <br></br><center><input type="submit" /></center>
          </form>
         </div> 
      </div>
      <div className = "result">
    </div>
    </div>
    
  );
}


const SearchPage = () => {
    // attributes
    const [inputs, setInputs] = useState({});
    const [easy, setEasy] = useState(false);
    const [time, setTime] = useState(100);
    const [steps, setSteps] = useState(100);

    // display values
    const [clicked, setClicked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    // return values
    const [recipes, setRecipes] = useState([]);
    

    useEffect(() => {
        if (clicked) { 
          axios.get(`http://localhost:8080/search/${inputs.query}/${time}/${steps}`, {
            mode: "no-cors"
          }).then((response) => {
            setRecipes(response.data);
          });
          setClicked(false);
        }
    },[clicked, setClicked, inputs, time, steps])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        setIsSubmitted(true);
        setClicked(true);
    }


    return (
        <div className="recipe">
        <SearchBar inputs={inputs} setInputs={setInputs} handleSubmit={handleSubmit}/>   
        <Filter easy={easy} setEasy={setEasy} setTime={setTime} setSteps={setSteps} handleSubmit={handleSubmit}/>
        <div>
        {isSubmitted && 
            Array.from(recipes).map((recipe) => {
            if (recipe.RecipeName !== 'RecipeName') {
                return(<><ul key={recipe.RecipeId}><b>{recipe.RecipeName}</b><br></br> 
                Time: {recipe.Time} 
                Steps: {recipe.NumberOfSteps} 
                Ingredients: {recipe.NumberOfIngredients}
                <button 
                  onClick={() => console.log(`Added ${recipe.RecipeName} to favorites!`)}
                  style={{
                    borderRadius: '20%',
                    backgroundColor: '#a18fc6',
                    float: 'right',
                  }}
                  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" width="20" height="20"><path d="M12 21.35l-1.87-1.69C4.9 14.58 2 11.53 2 7.97 2 5.38 4.09 3.3 6.63 3.05c2.63-.25 5.11 1.37 5.37 3.98.26-2.61 2.74-4.23 5.37-3.98 2.54.24 4.63 2.32 4.63 4.92 0 3.56-2.9 6.61-8.13 11.69L12 21.35z"/></svg>
                </button>        
              </ul></>);
             }
            return (<></>);
            })
          }
        </div>
      </div>
    )
}

export default SearchPage;