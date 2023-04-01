import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const Stopwatch = () => {
  const [time, setTime] = useState({
    ms: 0,
    s: 0,
    m: 0,
    h: 0,
  });
  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (showConfetti) {
      timeoutId = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showConfetti]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const start = () => {
    if (running) return;

    setRunning(true);
    setIntervalId(
      setInterval(() => {
        setTime((time) => {
          let ms = time.ms;
          let s = time.s;
          let m = time.m;
          let h = time.h;

          ms += 1;
          if (ms === 100) {
            s += 1;
            ms = 0;
          }
          if (s === 60) {
            m += 1;
            s = 0;
          }
          // Show confetti every 25 minutes
          if (m % 25 === 0 && m !== 0) {
            setShowConfetti(true);
          }
          if (m === 60) {
            h += 1;
            m = 0;
          }

          return { ms, s, m, h };
        });
      }, 10)
    );
  };

  const stop = () => {
    if (!running) return;

    clearInterval(intervalId);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalId);
    setRunning(false);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setShowConfetti(false);
  };

  const formatTime = (time) => {
    const pad = (value) => {
      return value < 10 ? "0" + value : value;
    };

    return `${time.h}:${pad(time.m)}:${pad(time.s)}:${pad(time.ms)}`;
  };

  return (
    <div className="stopwatch">
      {showConfetti && <Confetti />}{" "}
      {/* show confetti when showConfetti is true */}
      <div className="time">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
