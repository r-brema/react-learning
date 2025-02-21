function ProgressBar({totalQuestions, questionIndex,points, maxPoints, selectedOption  }) {
  return (
    <header className="progress">
      <progress max={totalQuestions} value={questionIndex -1 + Boolean(selectedOption)} />  
      <p>Question <strong>{questionIndex }</strong>/{totalQuestions} </p>
      <p><strong>{points}</strong>/{maxPoints}</p>
    </header>
  );
}

export default ProgressBar;
