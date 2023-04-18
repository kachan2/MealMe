// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import "./search.css";

// const SearchBar = () => {
//   // make serach bar the parent but have set states for time and steps from the filter serach 
//   const [inputs, setInputs] = useState({});
//   const [recipes, setRecipes] = useState([]);
//   const [toQuery, setToQuery] = useState("nothing");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [clicked, setClicked] = useState(false);

//   useEffect(() => {
//     if (clicked) { 
//       axios.get(`http://localhost:8080/search/${toQuery}`, {
//         mode: "no-cors"
//       }).then((response) => {
//         setRecipes(response.data);
//       });
//       setClicked(false);
//     }
//   },[clicked, setClicked, toQuery])

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputs(values => ({...values, [name]: value}))
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(inputs);
//     setToQuery(inputs.query);
//     setIsSubmitted(true);
//     setClicked(true);
//   }

//   return(
//     <div>
//     <center>
//     <form onSubmit={handleSubmit}>
//         <input 
//           id="input"
//           type="text" 
//           name="query" 
//           placeholder="Search"
//           value={inputs.query || ""} 
//           onChange={handleChange}
//         /> 
//       <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
//          <svg style={{width:"20px",height:"20px", viewBox:"0 0 24 24"}}><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
//          </svg>
//        </button>
//     </form>
//     </center>
//     {isSubmitted && 
//       Array.from(recipes).map((recipe) => {
//         return(<><ul key={recipe.RecipeId}><b>{recipe.RecipeName}</b><br></br> Time: {recipe.Time} Steps: {recipe.NumberOfSteps}</ul></>);
//       })
//     }
//     </div>

//   )
// }


// const Filter = () => {
//   const [easy, setEasy] = useState(false);
//   const [time, setTime] = useState(-1);
//   const [steps, setSteps] = useState(-1);

//   const [display, setDisplay] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const [recipes, setRecipes] = useState([]);


//   // fix stp, time, and easy
//   // to combine with search, add them all to one query (where clause)
//   useEffect(() => {
//     if (display) {
//       if (easy) {
//         axios.get('http://localhost:8080/find/10/10', {
//           mode: "no-cors",
//         }).then((response) => {
//           setRecipes(response.data);
//         });
//       } else {
//         axios.get(`http://localhost:8080/find/${time}/${steps}`, {
//           mode: "no-cors",
//         }).then((response) => {
//           setRecipes(response.data);
//         });

//       }
//       setDisplay(false);
//     }
//   }, [display, easy, steps, time, setDisplay, setRecipes])

//   const handleCheck = () => {
//     setEasy(!easy);
//   };


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setDisplay(true);
//     setIsSubmitted(true);
//   }

//   return (
//     <div>
//       <div className = "eclipse"></div>
//       <div className="filter"> 
//         <h4>Filters</h4>
//         <div className = "easy">
//           <form onSubmit = {handleSubmit}>
//           <input type = "checkbox"
//                   id = "easy"
//                   name = "easy"
//                   value = {easy}
//                   checked = {easy}
//                   onChange = {handleCheck}
//                 />
//           <label htmlFor="easy">Easy Recipes</label> <br></br><br></br>
//           {/* <input type="range" id="steps" name="steps" min="0" max="60"/>
//           <label htmlFor="steps">Number of Steps</label> <br></br><br></br>
//           <input type="range" id="time" name="time" min="0" max="60"/>
//           <label htmlFor="time">Time (minutes)</label> <br></br><br></br> */}
//           <br></br><center><input type="submit" /></center>
//           </form>
//          </div> 
//       </div>
//       <div className = "result">
//       {isSubmitted && 
//         Array.from(recipes).map((recipe) => {
//           if (recipe.RecipeName != 'RecipeName') {
//             return(<><ul key={recipe.RecipeId}><b>{recipe.RecipeName}</b><br></br> Time: {recipe.Time} Steps: {recipe.NumberOfSteps} Ingredients: {recipe.NumberOfIngredients}</ul></>);
//           }
//           return (<></>);
//         })
//       }
//     </div>
//     </div>
    
//   );
// }


// function RecipePage () {
//   return (
//     <div className="recipe">
//       <SearchBar />   
//       <Filter />
//     </div>
//   )
// }

// export default RecipePage;