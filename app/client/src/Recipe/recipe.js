import './App.css';
import soup from "./soup.png";
import { useState } from 'react';
import axios from "axios";


function RecipePage (){
  return (
    <div className="recipe">
      <Header />
      <Filter />   
      <Component />
    </div>
  )
}
function Header(){
  return (
  <div className = "header">
    <div className="logo-frame">
      <h1>MealMe</h1>
    </div>
  </div>
  );
}

function Filter(){
  const [easy,setEasy] = useState(false);
  const [display,setDisplay] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const easyRecipes = async () => {
    setEasy(!easy);
    try {
      const response = await axios.get('/api/recipes', {
        params: {
          easy: !easy,
          display: display
        }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const displayAll = async () => {
    setDisplay(!display);
    try {
      const response = await axios.get('/api/recipes', {
        params: {
          easy: easy,
          display: !display
        }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
  <div>
    <div className = "eclipse"></div>
    <div className="filter"> 
      <h4>Filters</h4>

      <div className = "easy">
        <input type = "checkbox"
                id = "topping"
                name = "topping"
                value = "Panner"
                checked = {easy}
                onChange = {easyRecipes} />
        Easy Recipes
      </div>

      <div className = "display">
        <input type = "checkbox"
                id = "topping"
                name = "topping"
                value = "Panner"
                checked = {display}
                onChange = {displayAll} />
        Display All
      </div>
    </div>
  </div>
  );
}
function Component(){
  return (
    <div>
      <div className = "component-1">
        <div className = "background"></div>
        <div className = "img"><img src={soup}/></div>
        <div className = "text">MealMe</div>
      </div>
    </div>
  );
}


export default RecipePage;