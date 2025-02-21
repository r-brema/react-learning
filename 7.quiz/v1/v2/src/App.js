import {useEffect} from 'react';
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import Footer from "./Footer";
import StartScreen from './StartScreen';
import FinishScreen from './FinishScreen';
import { useQuizContext } from './context/QuizContext';


function App() {
const {questions, questionIndex, status, points, highScore,  selectedOption,secondsRemaining, dispatch } = useQuizContext();

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
