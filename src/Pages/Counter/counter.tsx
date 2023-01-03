import React, { useEffect, useRef, useState } from "react";
import "./counter.css";

const Counter = (): React.ReactElement => {
  const [count, setCount] = useState<number>(0);
  const [isTimerRunning, setTimerStatus] = useState<boolean>(false);
  let timerRef = useRef<NodeJS.Timer | undefined>();

  useEffect(() => {
    // To Clear Interval when component in unmounted
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleTimer = (): void => {
    if (isTimerRunning) {
      setTimerStatus(false);
      clearInterval(timerRef.current);
      return;
    }
    setTimerStatus(true);
    timerRef.current = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
  };

  const resetTimer = (): void => {
    setTimerStatus(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCount(0);
  };

  return (
    <div className="container">
      <p>
        <b>Count:</b> {count}
      </p>
      <section className="button-container">
        <button onClick={handleTimer} className={"button"}>{`${
          isTimerRunning ? "Pause" : "Start"
        }`}</button>
        <button onClick={resetTimer} className={"button"}>
          {"Reset"}
        </button>
      </section>
    </div>
  );
};

export default Counter;
