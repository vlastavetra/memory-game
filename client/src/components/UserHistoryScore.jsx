import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./UserHistoryScore.css";

const UserHistoryScore = () => {
  const [userHistoryScore, setUserHistoryScore] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const getUserHistoryScore = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}scores/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setUserHistoryScore(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
    getUserHistoryScore();
  }, []);

  return (
    <div className="score-table-container">
      <h2 className="score-title-h2">Your scores history</h2>
      <table className="score-table">
        <thead className="score-table-head">
          <tr className="score-table-head-row">
            <th className="score-table-head-column">Score</th>
            <th className="score-table-head-column">Date</th>
          </tr>
        </thead>
        <tbody className="score-table-body">
          {userHistoryScore.map((obj) => (
            <tr key={obj._id} className="score-table-body-row">
              <td className="score-table-body-column">{obj.score}</td>
              <td className="score-table-body-column">
                {dayjs(obj.date).format("HH:mm YYYY-MM-DD")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHistoryScore;
