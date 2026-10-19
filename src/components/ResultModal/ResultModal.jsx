import React from "react";
import "./ResultModal.css";

const ResultModal = ({ winner, onPlayAgain, onChangeSide }) => {
  return (
    <div className="overlay">
      <div className="modal" role="dialog" aria-modal="true">
        {winner ? (
          <>
            <p className={"modal-symbol " + winner.toLowerCase()}>{winner}</p>
            <h2 className="modal-title">wins the round!</h2>
          </>
        ) : (
          <>
            <p className="modal-symbol tie">=</p>
            <h2 className="modal-title">It is a draw</h2>
          </>
        )}

        <div className="modal-actions">
          <button className="btn-primary" onClick={onPlayAgain}>
            Play again
          </button>
          <button className="btn-ghost" onClick={onChangeSide}>
            Change symbol
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
