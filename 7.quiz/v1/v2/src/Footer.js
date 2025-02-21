import Timer from "./Timer";

function Footer({isAnswered, dispatch, isFinalQuestion, secondsRemaining}) {

  return (
    <div>
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
      <div>{isAnswered &&  <button className="btn btn-ui" 
      onClick={() => dispatch({'type': isFinalQuestion? 'quiz/finish' : 'question/next'})}>{isFinalQuestion? 'Finish' : 'Next'}
      </button> }
    </div>
    </div>
  );
}

export default Footer;
