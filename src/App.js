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
  const [diffculty,setDiffculty] = useState("")
  const [category,setCategory] = useState("")
  const [displayData,setDisplayData] = useState({category:"Any",diffculty:"Any"})
  function getQuestions(){
    return fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${diffculty}`).then(response => response.text())
    .then(text => text.replaceAll("&quot;",'\\"').replaceAll("&#039;","'").replaceAll("&amp;","&").replaceAll("&rdquo;","”").replaceAll("&eacute;","e"))
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
  function restart(){
    setIsStarted(false);
    setIsDataFetched(false);
    getQuestions().then(data => setQuestionsData(data.results))
  }
  useEffect(() => {
    getQuestions().then(data => setQuestionsData(data.results));  
  }, [diffculty,category])
  
  return (
    <div className="App">
      <h1 className={isStarted ? "started" : "not-started"}>Trivact</h1>

      {!isStarted && <Main setDisplayData={setDisplayData} start={() => setIsStarted(true)} diffculty={diffculty} setDiffculty={setDiffculty} category={category} setCategory={setCategory}/>}
      {isStarted && <Game restart={restart} displayData={displayData} startingData={{diffculty:[diffculty],category:[category]}} questionsData={questionsData} generateNewQuestions={generateNewQuestions} switchQuestions={switchQuestions}/>}
      {!isDataFetched && <h1>Loading data</h1>}
    </div>
  );
}

export default App;
