import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./Score.css";

//todo: token, loader

const Score = () => {
  const [allUsersScore, setAllUsersScore] = useState([]);
  const [userHistoryScore, setUserHistoryScore] = useState([]);
  const [userLastScore, setUserLastScore] = useState("");
  const [userHighScore, setUserHighScore] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState("");

  const getAllUsersData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/scores`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setAllUsersScore(res.data);
      //showLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserHistoryScore = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/scores/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setUserHistoryScore(res.data);
      //showLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserLastScore = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8080/scores/last/${userId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUserLastScore(res.data[0].score);
      //showLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserHighScore = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8080/scores/high/${userId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUserHighScore(res.data[0].score);
      //showLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
    getAllUsersData();
    getUserHistoryScore();
    getUserLastScore();
    getUserHighScore();
    //showLoader(true);
  }, []);

  return (
    <main className="main-usermatch-container">
      <h1 className="usermatch-title">Scores</h1>
      <div className="user-score-container">
        <div className="user-score"><span>Your last score: </span><span>{userLastScore}</span></div>
        <div className="user-score"><span>Your high score: </span><span>{userHighScore}</span></div>
      </div>
      <div className="tables-container">
      <table className="usermatch-table">
        <thead className="usermatch-table-head">
          <tr className="usermatch-table-head-row">
            <th className="usermatch-table-head-column">Score</th>
            <th className="usermatch-table-head-column">Date</th>
          </tr>
        </thead>
        <tbody className="usermatch-table-body">
          {userHistoryScore.map((obj) => (
            <tr key={obj._id} className="usermatch-table-body-row">
              <td className="usermatch-table-body-column">{obj.score}</td>
              <td className="usermatch-table-body-column">{dayjs(obj.date).format('HH:mm YYYY-MM-DD')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="usermatch-table">
        <thead className="usermatch-table-head">
          <tr className="usermatch-table-head-row">
            <th className="usermatch-table-head-column">User</th>
            <th className="usermatch-table-head-column">Score</th>
            <th className="usermatch-table-head-column">Date</th>
          </tr>
        </thead>
        <tbody className="usermatch-table-body">
          {allUsersScore.map((obj) => (
            <tr key={obj._id} className="usermatch-table-body-row">
              <td className="usermatch-table-body-column">{obj.nickname}</td>
              <td className="usermatch-table-body-column">{obj.score}</td>
              <td className="usermatch-table-body-column">{dayjs(obj.date).format('HH:mm YYYY-MM-DD')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  );
};

export default Score;
