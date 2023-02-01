import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./UserHistoryScore.css";

const AllUserHistoryScore = () => {
  const [allUsersScore, setAllUsersScore] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const getAllUsersData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/scores`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setAllUsersScore(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getAllUsersData();
  }, []);

  return (
    <div className="score-table-container">
      <h2 className="score-title-h2">All users scores history</h2>
      <table className="score-table">
        <thead className="score-table-head">
          <tr className="score-table-head-row">
            <th className="score-table-head-column">User</th>
            <th className="score-table-head-column">Score</th>
            <th className="score-table-head-column">Date</th>
          </tr>
        </thead>
        <tbody className="score-table-body">
          {allUsersScore.map((obj) => (
            <tr key={obj._id} className="score-table-body-row">
              <td className="score-table-body-column">{obj.nickname}</td>
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

export default AllUserHistoryScore;
