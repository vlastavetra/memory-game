import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserScore.css";

const UserScore = () => {
  const [userLastScore, setUserLastScore] = useState("");
  const [userHighScore, setUserHighScore] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const getUserLastScore = async () => {
    if (userId) {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8080/scores/last/${userId}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setUserLastScore(res.data[0].score);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getUserHighScore = async () => {
    if (userId) {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8080/scores/high/${userId}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setUserHighScore(res.data[0].score);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
    getUserLastScore();
    getUserHighScore();
  }, []);

  return (
    <div className="user-score-container">
      <div className="user-score">
        <span>Your last score: </span>
        <span>{userLastScore && userLastScore}</span>
      </div>
      <div className="user-score">
        <span>Your high score: </span>
        <span>{userHighScore && userHighScore}</span>
      </div>
    </div>
  );
};

export default UserScore;
