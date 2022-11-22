import React,{useState,useEffect} from "react";
import "./Main.css"
export default function Main(){
    const [diffculty,setDiffculty] = useState("easy")
    const [questions,setQuestions] = useState([])

    function handleChange(event,set){
        set(event.target.value)
    }

    function getQuestions(){
        return fetch(`https://opentdb.com/api.php?amount=10&difficulty=${diffculty}`).then(response => response.json())
    }

    useEffect(() => {
        getQuestions().then(data => setQuestions(data));
    }, [diffculty])

    function play(){
        
    }
    return(
        <div className="main">
            <div className="diffculty">
                <h4>Choose Diffculty</h4>
                <select onChange={event => handleChange(event,setDiffculty) } value={diffculty}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <button onClick={play}>Play</button>
        </div>
    )
}