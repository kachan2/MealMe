import React, { useState, useEffect } from "react";
import axios from "axios";
import {AiOutlineDelete} from "react-icons/ai";

import "./recipe2.css";
import "./remove.css";

const Recipe = ({recipeid, name, time, steps, instruction, userid}) => {
    const [visible, setVisible] = useState(true);

    const handleClick = () => {
        console.log("send this to the trash!");
        setVisible(false);
        axios.get(`http://localhost:8080/favorites-delete/${userid}/${recipeid}`, {
            mode: "no-cors"
        }).then((response) => {console.log(response);})
    }

    return (
        <div>
        {   
            visible &&
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
                        Array.from(instruction.split(/\r?\n/)).map((i, idx) => {
                            return (
                                <p>{idx + 1}. &nbsp; {i}</p>
                            );
                        })
                        
                    }
                </div>
                </section>
                <input key={recipeid} type="radio" name="accordion" id="acc-close" onClick={()=> console.log(name)}/>
            </nav>
            <AiOutlineDelete className="delete-recipe" onClick = {handleClick}/>
            </div>
        }
        </div>
    );
}

export default Recipe;