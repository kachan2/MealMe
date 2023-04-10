// import './recipe.css';
// import soup from "./soup.png";
// import React, { useState, useEffect } from 'react';
// import axios from "axios";


// const Filter = () => {
//   // const [inputs, setInputs] = useState({});
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
//           <input type="range" id="steps" name="steps" min="0" max="60"/>
//           <label htmlFor="steps">Number of Steps</label> <br></br><br></br>
//           <input type="range" id="time" name="time" min="0" max="60"/>
//           <label htmlFor="time">Time (minutes)</label> <br></br><br></br>
//           <br></br><center><input type="submit" /></center>
//           </form>
//          </div> 
//       </div>
//       {isSubmitted && 
//       Array.from(recipes).map((recipe) => {
//         return(<><ul key={recipe.RecipeId}>{recipe.RecipeName} Time: {recipe.Time} Steps: {recipe.NumberOfSteps}</ul></>);
//       })
//     }
//     </div>
//   );
// }


// function Component() {
//   return (
//     <div>
//       <div className = "component-1">
//         <div className = "background"></div>
//         <div className = "img"><img src={soup}/></div>
//         {/* <div className = "text">MealMe</div> */}
//       </div>
//     </div>
//   );
// }


// function RecipePage () {
//   return (
//     <div className="recipe">
//       <Filter />   
//       <Component />
//     </div>
//   )
// }


// export default RecipePage;