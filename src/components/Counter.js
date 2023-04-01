import React, { useState } from "react";

const Counter = () => {
  // Initialize state variable 'count' with 0
  const [count, setCount] = useState(0);

  // Function to increment the count by 1
  const increment = () => {
    setCount(count + 1);
  };

  // Function to decrement the count by 1 if it's greater than 0
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="counter">
      {/* Display the current count */}
      <div className="count">{count}</div>
      {/* Buttons to increment and decrement the count */}
      <div className="controls">
        <button onClick={increment}>Add</button>
        <button onClick={decrement}>Sub</button>
      </div>
    </div>
  );
};

export default Counter;
