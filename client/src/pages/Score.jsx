import React from "react";
import "./Score.css";
import UserScore from "../components/UserScore";
import UserHistoryScore from "../components/UserHistoryScore";
import AllUserHistoryScore from "../components/AllUserHistoryScore";

const Score = () => {
  return (
    <main className="main-score-container">
      <h1 className="score-title">Scores</h1>
      <UserScore />
      <div className="tables-container">
        <UserHistoryScore />
        <AllUserHistoryScore />
      </div>
    </main>
  );
};

export default Score;
