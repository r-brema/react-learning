import { createContext, useContext, useReducer } from "react";

const QuizContext  = createContext();

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

function QuizContextProvider({children}){
  const [{questions, questionIndex, status, message, points, highScore,  selectedOption,secondsRemaining}, dispatch] = useReducer(questionReducer,initialState);

    return <QuizContext.Provider value={ {questions, questionIndex, status, message, points, highScore,  selectedOption,secondsRemaining, dispatch }}>
        {children}
    </QuizContext.Provider>

}

function useQuizContext(){
    const context  = useContext(QuizContext);
    if (context === undefined) throw new Error("Quiz context used outside the Quiz provider");
    return context;
}

export {QuizContextProvider, useQuizContext}