import React, { useState, useEffect } from "react"
import Question from './Question';
import "./Game.css"
import { nanoid } from "nanoid";
import Timer from "./Timer";
import DataDisplayer from "./DataDisplayer";
export default function Game(props) {
    const startingData = props.startingData;
    const [questions, setQuestions] = useState([]);

    const [questionsNum, setQuestionsNum] = useState(0);
    const [correctAnswers,setCorrectAnswers] = useState(0);
    const [isNewGenerated, setIsNewGenerated] = useState(false);
    const [answerObject, setAnswer] = useState("");
    const [iteration,setIteration] = useState(0);

    const [timer,setTimer] = useState(60);
    const [score,setScore] = useState(0);
    useEffect(() => {
        setQuestions(props.questionsData.map(question => {
            return (
                <Question
                    key={nanoid()}
                    question={question.question}
                    answers={question.type === "boolean" ? ["True","False"]:addCorrectAnswer(question.incorrect_answers, question.correct_answer)}
                    setAnswer={setAnswer} 
                    correctAnswer={question.correct_answer}/>)
        }))
    }
        , [props.questionsData])

    function addCorrectAnswer(arr, answer) {

        arr.splice(arr.length * Math.random(), 0, answer)
        return arr;
    }
    useEffect(() => {
        const answer = answerObject.answer;
        if (!answer)
            return;
        const correctAnswer = props.questionsData[questionsNum - (10*iteration)].correct_answer
        if (answer === correctAnswer) {
            setScore(prevScore => prevScore+1)
            setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
        } else {
            
        }
        setTimeout(() => {
            if(timer <= 0)
                return;
            if (questionsNum - (10*iteration) === 4 && !isNewGenerated) {
                props.generateNewQuestions();
                setIsNewGenerated(true);
            }
            if (questionsNum - (10*iteration)  === 9) {
                props.switchQuestions();
                setIteration(prevNum => prevNum+ 1)
                setIsNewGenerated(false);
            }
            setQuestionsNum(prevNum => prevNum + 1);
        }, 600);
        
    }, [answerObject])
    return (
        <div className="container">
            {timer > 0 ?
            <div className="container">
                <Timer timer={timer} setTimer={setTimer}/>
                <h2 className="score">Score : {score}</h2>
                <div className="question">
                {questions[questionsNum - (10*iteration)]}
                </div>
            </div> :
            <DataDisplayer restart={props.restart} category={props.displayData.category} diffculty={props.displayData.diffculty} questionsNum={questionsNum} correctAnswers={correctAnswers}/>
            }
            
            

        </div>
    )
}