import { useEffect, useRef } from "react";

const useDetectOutsideClick = (close, listenCapturing = false) => {
  const modalRef = useRef("");
  useEffect(() => {
    function handleClick(e) {
      //check the target element is the child node of modalRef
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        console.log("close outside");
        close();
      }
    }

    window.addEventListener("click", handleClick, listenCapturing);
    return () =>
      window.removeEventListener("click", handleClick, listenCapturing);
  }, [close, listenCapturing]);
  return modalRef;
};

export default useDetectOutsideClick;
