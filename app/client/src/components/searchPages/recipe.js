import React, { useState, useEffect } from "react";
import axios from "axios";

import "./recipe.css";
import "./like.css";

const Recipe = ({recipeid, name, time, steps, instruction, userid}) => {
    const [like, setLike] = useState(true);

    const handleLike = () => {
        setLike(!like);
        if (like) {
            console.log("adding to favorites");
            axios.get(`http://localhost:8080/favorites-insert/${userid}/${recipeid}`, {
                mode: "no-cors"
            }).then((response) => {
                console.log(response.data);
            });
        } else {
            console.log("removing from favorites");
            axios.get(`http://localhost:8080/favorites-delete/${userid}/${recipeid}`, {
                mode: "no-cors"
            }).then((response) => {
                console.log(response.data);
            });
        }
    }


    return (
        <div className="body">
          <nav className="accordion arrows">
            <input type="radio" name="accordion" id={recipeid} onClick={()=> console.log(name)}/>
            <section className="box" id={recipeid}>
            <label className="box-title" htmlFor={recipeid}>
                <div className="flex-box">
                    {name}
                </div>
            </label>
            <label className="box-close" htmlFor="acc-close"></label>
            <div className="box-content" id={recipeid}>
                <p><b>Time:</b> {time} &nbsp; <b>Number of Steps:</b> {steps} &nbsp; </p>
                <p><u>Instructions: </u></p>
                {   instruction && 
                    [...new Set(instruction.split("\n"))].map((i, idx) => {
                        return (
                            <p>{idx + 1}. &nbsp; {i}</p>
                        );
                    })
                }
            </div>
            </section>
            <input key={recipeid} type="radio" name="accordion" id="acc-close" onClick={()=> console.log(name)}/>
        </nav>
        <input className="heart" type="checkbox" value={like} checked={!like} onChange={handleLike} />
        </div>
    );
}

export default Recipe;