import "./Question.css"
import React,{useState,useEffect} from "react"
import { nanoid } from "nanoid";
export default function Question(props){
    const [buttons,setButtons] = useState(createButtons())
    const [isAnswered,setIsAnswered] = useState(false);
    const [answer,setAnswer] = useState("");
    function validateAnswer(answer){
        if(isAnswered){
            return;
        }
        setIsAnswered(true);
        setAnswer(answer)
        
    }
    useEffect(() => {
        if(!isAnswered)
            return;
        setIsAnswered(true)
        props.setAnswer({answer:answer}) 
        if(answer === props.correctAnswer){
            setButtons(buttons => buttons.map(button => {
                if(button.props.answer === props.correctAnswer){
                    return <button key={nanoid()} className="button-correct">{button.props.answer}</button>;
                }else{
                    return <button key={nanoid()} className={button.props.className}>{button.props.answer}</button>;
                }
            }))
        }else{
            setButtons(buttons => buttons.map(button => {
                if(button.props.answer === props.correctAnswer){
                    return <button key={nanoid()} className="button-correct">{button.props.answer}</button>;
                }else{
                    if(answer === button.props.answer){
                        return <button key={nanoid()} className="button-incorrect">{button.props.answer}</button>;
                    }else{
                        return <button key={nanoid()} className={button.props.className}>{button.props.answer}</button>;
                    }
                }
            }))
        }
    },[isAnswered])
    function createButtons(){
        return props.answers.map(answer => <button key={nanoid()} answer={answer} className="button-before-click" onClick={() => validateAnswer(answer)}>{answer}</button>)
    }
        
    
    return(
        <div className="container">
            <h2>{props.question}</h2>
            <div className="button-container">
                {buttons}
            </div>
        </div>
    )
}