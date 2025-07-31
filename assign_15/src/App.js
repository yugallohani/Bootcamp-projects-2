// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  // --- State for the count ---
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // --- Helper function for animation ---
  const triggerAnimation = () => {
    setIsAnimating(true);
    // Remove the animation class after the animation is done
    setTimeout(() => {
      setIsAnimating(false);
    }, 200); // Duration should match CSS transition
  };

  // --- Event Handlers ---
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
    triggerAnimation();
  };

  const handleDecrement = () => {
    // Prevents the count from going below zero
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
      triggerAnimation();
    }
  };

  const handleReset = () => {
    setCount(0);
    triggerAnimation();
  };

  return (
    <div className="counter-container">
      <h1 className="title">React Counter</h1>
      <div className="count-display-wrapper">
        <h2 className={`count-display ${isAnimating ? 'animate' : ''}`}>
          {count}
        </h2>
      </div>
      <div className="button-group">
        <button className="btn" onClick={handleDecrement} title="Decrement">
          -
        </button>
        <button className="btn" onClick={handleReset} title="Reset">
          ⟳
        </button>
        <button className="btn" onClick={handleIncrement} title="Increment">
          +
        </button>
      </div>
    </div>
  );
}

export default App;
