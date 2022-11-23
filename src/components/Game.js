import React, { useState, useEffect } from "react"
import Question from './Question';
import "./Game.css"
import { nanoid } from "nanoid";
export default function Game(props) {
    const [questions, setQuestions] = useState([]);

    const [currentQuestionNum, setCurrentQuestionNum] = useState(-1);
    const [numOfQuestions, setNumOfQuestions] = useState(0);
    const [isNewGenerated, setIsNewGenerated] = useState(false)
    const [answerObject, setAnswer] = useState("");

    useEffect(() => {
        setQuestions(props.questionsData.map(question => {
            return (
                <Question
                    key={nanoid()}
                    question={question.question}
                    answers={question.type == "boolean" ? ["True","False"]:addCorrectAnswer(question.incorrect_answers, question.correct_answer)}
                    setAnswer={setAnswer} 
                    correctAnswer={question.correct_answer}/>)
        }))
        setCurrentQuestionNum(0)
    }
        , [props.questionsData])
    useEffect(() => setNumOfQuestions(prevNum => questions.length + prevNum), [questions])
    function addCorrectAnswer(arr, answer) {

        arr.splice(arr.length * Math.random(), 0, answer)
        return arr;
    }
    useEffect(() => {
        const answer = answerObject.answer;
        if (!answer)
            return;
        console.log(props.questionsData[currentQuestionNum].question);
        console.log(currentQuestionNum);
        const correctAnswer = props.questionsData[currentQuestionNum].correct_answer
        if (answer == correctAnswer) {
            console.log("right answer")
        } else {
            console.log("false answer")
        }
        setTimeout(() => {
            if (currentQuestionNum == 4 && !isNewGenerated) {
                props.generateNewQuestions();
                setIsNewGenerated(true);
            }
            if (currentQuestionNum == 9) {
                props.switchQuestions();
                setIsNewGenerated(false);
            }
            setCurrentQuestionNum(prevNum => prevNum + 1);
        }, 600);
        
    }, [answerObject])

    return (
        <div>
            {questions[currentQuestionNum]}
        </div>
    )
}