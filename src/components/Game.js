import React, { useState, useEffect } from "react"
import Question from './Question';
import "./Game.css"
export default function Game(props) {
    const [questions, setQuestions] = useState([]);

    const [currentQuestionNum, setCurrentQuestionNum] = useState(-1);
    const [numOfQuestions, setNumOfQuestions] = useState(0);
    const [isNewGenerated, setIsNewGenerated] = useState(false)
    const [answer, setAnswer] = useState("");
    useEffect(() => {
        setQuestions(props.questionsData.map(question => {
            return (
                <Question
                    question={question.question}
                    answers={addCorrectAnswer(question.incorrect_answers, question.correct_answer)}
                    setAnswer={setAnswer} />)
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
        if (!answer)
            return;

        const correctAnswer = questions[currentQuestionNum].props.correct_answer
        if (answer == correctAnswer) {
            console.log("right answer")
        } else {
            console.log("false answer")
        }

        if (currentQuestionNum == 6 && !isNewGenerated) {
            props.generateNewQuestions();
            setIsNewGenerated(true);
        }
        if (currentQuestionNum == 9) {
            props.switchQuestions();
            setIsNewGenerated(false);
        }
        setCurrentQuestionNum(prevNum => prevNum + 1);
    }, [answer])

    return (
        <div>
            {questions[currentQuestionNum]}
        </div>
    )
}