import React, { useState, useEffect, useMemo, useRef } from "react";
import Stopwatch from "./components/Stopwatch";
import Counter from "./components/Counter";

const App = () => {
  const colors = useMemo(
    () => [
      [255, 125, 0],
      [255, 128, 0],
      [255, 255, 0],
      [128, 255, 0],
      [212, 255, 0],
      [0, 255, 128],
      [0, 255, 255],
      [0, 128, 255],
      [120, 0, 255],
      [128, 0, 255],
      [255, 0, 255],
      [255, 301, 128],
      [255, 64, 64],
      [255, 192, 64],
      [255, 255, 64],
      [64, 255, 64],
      [64, 255, 192],
      [64, 255, 255],
      [64, 192, 255],
      [64, 64, 255],
      [192, 64, 255],
      [255, 64, 192],
    ],
    []
  );

  const [stopwatchTitleColor, setStopwatchTitleColor] = useState(colors[0]);
  const [counterTitleColor, setCounterTitleColor] = useState(colors[1]);

  useEffect(() => {
    let index = 0;

    const stopwatchIntervalId = setInterval(() => {
      setStopwatchTitleColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 1000);

    const counterIntervalId = setInterval(() => {
      setCounterTitleColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 1000);

    return () => {
      clearInterval(stopwatchIntervalId);
      clearInterval(counterIntervalId);
    };
  }, [colors]);

  const stopwatchTitleStyle = {
    color: `rgb(${stopwatchTitleColor[0]}, ${stopwatchTitleColor[1]}, ${stopwatchTitleColor[2]})`,
    transition: "color 2s linear",
  };

  const counterTitleStyle = {
    color: `rgb(${counterTitleColor[0]}, ${counterTitleColor[1]}, ${counterTitleColor[2]})`,
    transition: "color 2s linear",
  };

  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="component">
          <h1 className="title" style={stopwatchTitleStyle}>
            Stopwatch
          </h1>
          <Stopwatch />
        </div>
        <div className="component">
          <h1 className="title" style={counterTitleStyle}>
            Productive Things Done 
          </h1>
          <Counter />
        </div>
      </div>
    </div>
  );
};

export default App;
