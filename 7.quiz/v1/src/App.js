import {useReducer, useEffect} from 'react';
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import Footer from "./Footer";
import StartScreen from './StartScreen';
import FinishScreen from './FinishScreen';


const initialState = {
  questions: [],
  //status: loading, error, ready, active, finished
  status: "loading",
  questionIndex: null,
  points:0,
  highScore: 0,
  message: "",
  selectedOption:null,
  secondsRemaining: null
}
const SEC_PER_QUESTION = 5;
function questionReducer(state, action){
  console.log(action);
  switch(action.type){
    case "question/success" :
      return {...state, questions: action.payload, status: 'ready', message: 'Quesiton received successfuly'}
    case "question/error":
      return {...state, questions: action.payload, status: 'error', message: action.payload}
    case "quiz/answered":
      console.log('answered');
      const points= action.payload.isCorrect ? state.points + 5: state.points;
      console.log(points);
      return {...state,  points: points, selectedOption: action.payload.option}
    case "question/next":
      return {...state,  questionIndex: state.questionIndex+1, selectedOption: null}
    case "quiz/finish":
      return {...state,  questionIndex: state.questionIndex+1, selectedOption: null, status:'finished', highScore: state.highScore > state.points? state.highScore: state.points }
    case "quiz/start":
        return {...state, status: 'active', 'questionIndex': 1, secondsRemaining: state.questions.length * SEC_PER_QUESTION}
    case "quiz/reset":
        return {...state, questionIndex: 1, 'status': 'active', points: 0, message: '', selectedOption:null, secondsRemaining: state.questions.length * SEC_PER_QUESTION }
    case "timer/tick":
      return {...state, secondsRemaining: state.secondsRemaining-1, 
        'status': state.secondsRemaining === 0? "finished": state.status }
    default:
      throw new Error("Unknown action");
  }
}
function App() {
  useEffect(function (){
    const controller = new AbortController();
    const signal = controller.signal;
   async function getQuestions(){
    
    try {
      const res = await fetch("http://localhost:8000/questions", {signal});
      if (res.ok) {
        const data = await res.json();
        dispatch({"type": "question/success", 'payload': data});

      }else throw Error('Something went wrong while fetching questions');
    
    }catch(err){
      dispatch({"type": "question/error", 'payload': err.message});
    }
    
   }
   getQuestions();

   return ()=> {
    controller.abort();
   }

  }, [])

  const [{questions, questionIndex, status, message, points, highScore,  selectedOption,secondsRemaining}, dispatch] = useReducer(questionReducer,initialState);
  const totalQuestions = questions.length;
  const maxPoints = totalQuestions * 5;
  const isFinalQuestion = questionIndex === totalQuestions;
  return (
    <div className="app">
      <Header />
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen totalQuestions={totalQuestions} dispatch={dispatch} />  }
      {status === 'active' &&
        <main> 
          <ProgressBar totalQuestions={totalQuestions} questionIndex={questionIndex} points={points} maxPoints={maxPoints} selectedOption={selectedOption}/>
          <Question question={questions[questionIndex-1]} dispatch={dispatch}  selectedOption={selectedOption} /> 
          <Footer isAnswered={selectedOption!==null} dispatch={dispatch}  isFinalQuestion={isFinalQuestion}  secondsRemaining={secondsRemaining} />
        </main>}
        {status === 'finished' && <FinishScreen points={points} maxPoints={maxPoints} highScore={highScore} dispatch={dispatch}  />
      }
     
      
    </div>
  );
}

export default App;
