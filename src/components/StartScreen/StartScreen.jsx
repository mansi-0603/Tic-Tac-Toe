import React from "react";
import "./StartScreen.css";

const StartScreen = ({ onChoose }) => {
  return (
    <div className="start">
      <h2 className="start-title">Choose your symbol</h2>
      <p className="start-hint">The symbol you pick plays first.</p>

      <div className="start-options">
        <button className="pick x" onClick={() => onChoose("X")}>
          X
        </button>
        <button className="pick o" onClick={() => onChoose("O")}>
          O
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
