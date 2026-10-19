import React, { useState } from "react";
import Square from "../square/Square";
import StartScreen from "../StartScreen/StartScreen";
import ResultModal from "../ResultModal/ResultModal";
import "./Board.css";
import { calculateWinner } from "../../utils/calculateWinner";

const Board = () => {
  // null until the player picks a symbol on the start screen
  const [firstPlayer, setFirstPlayer] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleChoose = (symbol) => {
    setFirstPlayer(symbol);
    setSquares(Array(9).fill(null));
    setXIsNext(symbol === "X");
  };

  const handlePlayAgain = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(firstPlayer === "X");
  };

  const handleChangeSide = () => {
    setFirstPlayer(null);
    setSquares(Array(9).fill(null));
  };

  // Show the start screen until a symbol has been chosen
  if (!firstPlayer) {
    return <StartScreen onChoose={handleChoose} />;
  }

  const result = calculateWinner(squares);
  const winner = result ? result.player : null;
  const winningLine = result ? result.line : [];

  const isDraw = !winner && squares.every((cell) => cell !== null);
  const gameOver = winner || isDraw;

  let status;
  let statusClass = "status";
  if (winner) {
    status = "Winner: " + winner;
    statusClass += " win";
  } else if (isDraw) {
    status = "It is a Draw";
    statusClass += " draw";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (index) => {
    if (squares[index] !== null || winner) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  return (
    <div className="game">
      <h2 className={statusClass}>{status}</h2>

      <div className="board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
            isWinning={winningLine.includes(index)}
          />
        ))}
      </div>

      <div className="controls">
        <button className="restart-btn" onClick={handlePlayAgain}>
          Restart
        </button>
        <button className="side-btn" onClick={handleChangeSide}>
          Change symbol
        </button>
      </div>

      {gameOver && (
        <ResultModal
          winner={winner}
          onPlayAgain={handlePlayAgain}
          onChangeSide={handleChangeSide}
        />
      )}
    </div>
  );
};

export default Board;
