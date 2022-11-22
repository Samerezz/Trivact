import "./Question.css"
import React from "react"

export default function Question(props){
    const buttons = props.answers.map(answer => <button onClick={() => props.answer(answer,props.correct_answer)}>{answer}</button>)
    return(
        <div className="container">
            <h2>{props.question}</h2>
            <div className="button-container">
                {buttons}
            </div>
        </div>
    )
}