import React from "react"
import "./DataDisplayer.css"
export default function Timer(props){
    return(
        <div className="display">
            <h3>Diffculty : {props.diffculty}</h3>
            <h3>Category : <strong>{props.category}</strong></h3>
            <h3>Questions Answered : <strong>{props.questionsNum}</strong></h3>
            <h3>Correct Answers : {props.correctAnswers}</h3>
            <button onClick={props.restart}>Play Again</button>
        </div>
    )
}