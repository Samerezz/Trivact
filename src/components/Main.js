import React,{useState,useEffect} from "react";
import "./Main.css"
export default function Main(props){

    function handleChange(event,set){
        set(event.target.value)
    }

    function play(){
        props.start();
    }
    return(
        <div className="main">
            <div className="diffculty">
                <h4>Choose Diffculty</h4>
                <select onChange={event => handleChange(event,props.setDiffculty) } value={props.diffculty}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <button onClick={play}>Play</button>
        </div>
    )
}