import './App.css';
import Main from './components/Main';
import Game from './components/Game';
import React,{useState,useEffect} from 'react';
function App() {
  //data states
  const [questionsData,setQuestionsData] = useState([])
  const [awaitedQuestions,setAwaitedQuestions] = useState([])
  const [isDataFetched,setIsDataFetched] = useState(false);
  //pre-start states
  const [isStarted,setIsStarted] = useState(false)
  const [diffculty,setDiffculty] = useState("easy")

  function getQuestions(){
    return fetch(`https://opentdb.com/api.php?amount=10&difficulty=${diffculty}`).then(response => response.text())
    .then(text => text.replaceAll("&quot;",'\\"').replaceAll("&#039;","'").replaceAll("&amp;","&"))
    .then(data =>  JSON.parse(data)).then(json => {
      setIsDataFetched(true);
      return json;
    })
  } 

  function generateNewQuestions(){
    setIsDataFetched(false);
    getQuestions().then(data => setAwaitedQuestions(data.results))
  }

  function switchQuestions(){
    setQuestionsData(awaitedQuestions);
  }
  useEffect(() => {
    getQuestions().then(data => setQuestionsData(data.results));  
  }, [diffculty])

  return (
    <div className="App">
      <h1 className={isStarted ? "started" : "not-started"}>Trivact</h1>

      {!isStarted && <Main start={() => setIsStarted(true)} diffculty={diffculty} setDiffculty={setDiffculty} />}
      {isStarted && <Game questionsData={questionsData} generateNewQuestions={generateNewQuestions} switchQuestions={switchQuestions}/>}
      {!isDataFetched && <h1>Loading data</h1>}
    </div>
  );
}

export default App;
