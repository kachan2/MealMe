import React from 'react';
import { useState, useEffect } from 'react'
import "./inventory.css";
import axios from "axios";

const Inventory = ({token}) =>{


  const [tags, setTags] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8080/inventory-select/${token}`, {
        mode: "no-cors"
      }).then((response) => {
        console.log(response.data);
        const newTags = response.data.map(item => item.IngredientName);
        setTags(newTags);
      })
      .catch(error => console.error(error));
  }, []);

  function handleKeyDown(e){
      if(e.key !== 'Enter') return
      const value = e.target.value.trim().toLowerCase()
      if(!value) return
    
      axios.get(`http://localhost:8080/inventory-insert/${token}/${value}`, {
        mode: "no-cors"
      }).then((response) => {
        setTags([...tags, value])
        e.target.value = ''
      });
  }

  function removeTag(tag_name, index){

    axios.get(`http://localhost:8080/inventory-delete/${token}/${tag_name}`, {
      mode: "no-cors"
    }).then((response) => {
      setTags(tags.filter((el, i) => i !== index))
    });
  }

  return (
    <><div>
     <center> <h3>My Inventory</h3></center>
    </div><div className="tags-container">
        {tags.map((tag_name, index) => (
          <div className="tag-item" key={index}>
            <span className="text">{tag_name}</span>
            <span className="close" onClick={() => removeTag(tag_name,index)}>&times;</span>
          </div>
        ))}
        <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Add Ingredient" />
      </div></>
  )
}

export default Inventory;