import React, { useState, useEffect } from "react";
// import Confetti from "react-confetti";

function Stopwatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  // const [showConfetti, setShowConfetti] = useState(false);

  function startTimer() {
    const startTime = Date.now() - elapsedTime;
    setTimerInterval(
      setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10)
    );
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    setElapsedTime(0);
  }

  function displayTime() {
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
  }

  function padTime(number) {
    return number.toString().padStart(2, "0");
  }

  // if timer starts and tab is inactive, timer will run in background and when tab is active again
  // this is to prevent timer from running in background when tab is inactive and user is not on the page (tab)
  useEffect(() => {
    // Run timer even if tab is inactive
    let hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    // If the page is hidden, timer runs in background and when tab is active again
    function handleVisibilityChange() {
      if (document[hidden]) {
        clearInterval(timerInterval);
      } else {
        // startTimer();
        if (elapsedTime > 0) {
          startTimer();
        }
      }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (
      typeof document.addEventListener === "undefined" ||
      typeof document[hidden] === "undefined"
    ) {
      console.log("This browser doesn't support Page Visibility API.");
    } else {
      document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div className="stopwatch">
      <div className="time">{displayTime()}</div>
      <div className="controls">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
