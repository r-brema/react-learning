function Question({question, dispatch, selectedOption}) {
  const isAnswered = selectedOption!==null ? true : false;
  console.log('answered: '+ selectedOption + ', is answered: ' + isAnswered);
  return (
    
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => {
          return <button className={`btn btn-option ${i === selectedOption ? "answer" : ""} ${
            isAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={`${question.id}-option-${i+1}`}
          disabled = {isAnswered? "disabled" : ""}
          onClick={()=>  dispatch({'type': 'quiz/answered','payload': {'isCorrect' :i=== question.correctOption, 'option':i}})}> 
        {option}
        </button>
        })}
      </div>
    </div>
  );
}

export default Question;
//() => dispatch({'type': 'quiz/answered', 'payload': i=== question.correctOption})