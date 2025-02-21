import { useEffect } from "react";
function Timer({dispatch, secondsRemaining}) {
  const mins = Math.floor(secondsRemaining /60);
  const sec = Math.floor(secondsRemaining % 60);
  useEffect(
     function () {
      const id = setInterval(function (){
        dispatch({type: 'timer/tick'});
       
    }, 1000);
    
    return () => clearInterval(id);


  }, [dispatch])

  return <div className="timer"> Time Left: {mins.toString().padStart(2, '0') 
  }: { sec.toString().padStart(2, '0')}</div>;
}

export default Timer;
