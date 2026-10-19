import React from "react";
import "./square.css";

const Square = ({ value, onSquareClick, isWinning }) => {
  const className =
    "singlecell" +
    (value === "X" ? " x" : "") +
    (value === "O" ? " o" : "") +
    (isWinning ? " winning" : "");

  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
