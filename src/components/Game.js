import React,{useState,useEffect} from "react"
import Question from './Question';
import "./Game.css"
export default function Game(props) {
    const [questions, setQuestions] = useState([]);
    
    const [currentQuestionNum,setCurrentQuestionNum] = useState(-1);
    const [numOfQuestions,setNumOfQuestions] = useState(0);
    
    useEffect(() => {
        setQuestions(props.questionsData.map(question => {
            return (
            <Question
            question={question.question}
            answers={addCorrectAnswer(question.incorrect_answers,question.correct_answer)}
            answer={answerQuestion}
            correct_answer={question.correct_answer}/>)
        }))
        setNumOfQuestions(prevNum => props.questionsData.length + prevNum);
        setCurrentQuestionNum(0)} 
    ,[props.questionsData])
    function addCorrectAnswer(arr,answer){
        arr.splice(arr.length * Math.random(),0,answer)
        return arr;
    }

    function answerQuestion(answer,correct_answer) {
        if (answer == correct_answer) {
            console.log("right answer")
            
        } else {
            console.log("false answer")
            
        }
        setCurrentQuestionNum(prevNum => prevNum + 1);
        
    }
    return (
        <div>
            {questions[currentQuestionNum]}
        </div>
    )
}