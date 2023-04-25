import React, { useState, useEffect } from "react";
import {ScrollView} from 'react-native';
import axios from "axios";

import "./search.css";
import "./scroller2.css";
import StepSlider from "../functionalities/stepSlider.js";
import TimeSlider from "../functionalities/timeSlider.js";
import MultipleSelectCheckmarks from "../functionalities/dropdown.js";
import Recipe from "./recipe.js";
import LoadingSpinner from "../functionalities/spinner";

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
    </div>

  )
}


const Filter = ({tag, setTags, setTime, setSteps, handleSubmit}) => {

  return (
    <div>
      <div className = "eclipse"></div>
      <div className="filter"> 
        <h4>Filters</h4>
        <div className = "easy">
          <form onSubmit = {handleSubmit}>
          <StepSlider setSteps={setSteps} /> <br></br>
          <TimeSlider setTime={setTime} /> <br></br> <br/>
          <MultipleSelectCheckmarks tag={tag} setTags={setTags}/> <br/><br/>
          <input className="search-button" type="submit" />
          </form>
         </div> 
      </div>
      <div className = "result">
    </div>
    </div>
    
  );
}


const SearchPage = ({token}) => {
    // attributes
    const [inputs, setInputs] = useState("");
    const [time, setTime] = useState(10000);
    const [steps, setSteps] = useState(10000);
    const [tag, setTags] = useState([]);

    // display values
    const [clicked, setClicked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
  
    // return values
    const [recipes, setRecipes] = useState([]);
    

    useEffect(() => {
        if (clicked) { 
          console.log(tag);
          console.log(inputs.query);
          if (tag.length < 1) {
            axios.get(`http://localhost:8080/search2`, {
            params: {
              query: inputs.query || "",
              time: time, 
              steps: steps,
            }
          }).then((response) => {setRecipes(response.data);})
          } else {
            axios.get(`http://localhost:8080/search`, {
            params: {
              query: inputs.query || "",
              time: time, 
              steps: steps,
              tag: JSON.stringify(tag)
            }
          }).then((response) => {setRecipes(response.data); setLoading(false);})
          }
          setClicked(false);
        }
    },[clicked, setClicked, inputs, time, steps])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        setIsSubmitted(true);
        setClicked(true);
        setLoading(true);
    }


    return (
        <div className="recipe">
        <SearchBar style="margin-bottom:3cm;" inputs={inputs} setInputs={setInputs} handleSubmit={handleSubmit}/>  
        <Filter tag={tag} setTags={setTags} setTime={setTime} setSteps={setSteps} handleSubmit={handleSubmit}/>
        <div className="scroll">
          {isSubmitted &&
          <ScrollView>
            {loading ?
            <LoadingSpinner />
            :
                Array.from(recipes).map((recipe) => {
                  if (recipe.RecipeName !== 'RecipeName') {
                    return(
                      <>
                      <Recipe 
                        key={recipe.RecipeId} 
                        recipeid={recipe.RecipeId} 
                        name={recipe.RecipeName} 
                        time={recipe.Time} 
                        steps={recipe.NumberOfSteps} 
                        userid={token} 
                        instruction={recipe.Instructions} />
                      </>
                    );
                  }
                })
            }
          </ScrollView>
          }
        </div>
        </div>
    )
}



export default SearchPage;
