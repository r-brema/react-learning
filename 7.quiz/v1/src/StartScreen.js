function StartScreen({totalQuestions, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{totalQuestions} question to test your React mastery</h3>            
            <button onClick={()=> dispatch({'type': 'quiz/start'})} className="btn btn-ui"> Let's start</button>
        </div>
    )
}

export default StartScreen
