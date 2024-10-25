import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
   const handleMouseMove = (event) => {
     console.log(`Mouse Coordinates: X: ${event.clientX}, Y: ${event.clientY}`);
   };

   window.addEventListener("mousemove", handleMouseMove);

  const hiddenWord = "hello";
  const [input, setInput] = useState("");
  const [showWord, setShowWord] = useState(false);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    function handleKeyPress(event) {
      setInput((prevInput) => prevInput + event.key);
    }

    window.addEventListener("keypress", handleKeyPress);

    if (input.includes(hiddenWord)) {
      setShowWord(true);
    }

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [input, hiddenWord]);

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning]);

  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setTime(0);
  }
  

  return (
    
    <div className="App">

      <div className="hidden-word-container">
        <h2 className="hidden-word-title">
          Type the hidden word to reveal it!
        </h2>
        <input
          type="text"
          className="hidden-word-input"
          value={input}
          readOnly
          placeholder="Start typing..."
        />
        {showWord && (
          <p className="hidden-word-output">Hidden Word: {hiddenWord}</p>
        )}
      </div>

      <div className="timer-container">
        <div className="timer-display">{`Time: ${time} seconds`}</div>
        <div className="timer-controls">
          <button
            className="timer-button"
            onClick={startTimer}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className="timer-button"
            onClick={pauseTimer}
            disabled={!isRunning}
          >
            Pause
          </button>
          <button
            className="timer-button"
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {isRunning ? "Pause" : "Resume"}
          </button>
          <button className="timer-button" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default App;
