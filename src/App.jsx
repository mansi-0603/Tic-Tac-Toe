import React from "react";
import Board from "./components/Board/Board";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>
      <Board />
    </div>
  );
};

export default App;
