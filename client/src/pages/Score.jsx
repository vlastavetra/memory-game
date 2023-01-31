import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

//todo: token, loader

const Score = () => {
  const [allUsersScore, setAllUsersScore] = useState([]);
  const [userHistoryScore, setUserHistoryScore] = useState({});
  const [userLastScore, setUserLastScore] = useState({});
  const [userHighScore, setUserHighScore] = useState({});

  const getAllUsersData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/scores`, {
        //headers: { authorization: `Bearer ${token}` },
      });
      setAllUsersScore(res.data);
      console.log(res.data)
      //showLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserHistoryScore = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/scores/63d7d933c6059f6ae743b2fb`, {
        //headers: { authorization: `Bearer ${token}` },
      });
      setUserHistoryScore(res.data);
      console.log(res.data)
      //showLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserLastScore = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/scores/last/63d7d933c6059f6ae743b2fb`, {
        //headers: { authorization: `Bearer ${token}` },
      });
      setUserLastScore(res.data);
      console.log(res.data)
      //showLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserHighScore = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/scores/high/63d7d933c6059f6ae743b2fb`, {
        //headers: { authorization: `Bearer ${token}` },
      });
      setUserHighScore(res.data);
      console.log(res.data)
      //showLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsersData();
    getUserHistoryScore();
    getUserLastScore();
    getUserHighScore();
    //showLoader(true);
  }, []);

  return (
    <main className="main-usermatch-container">
        <h1 className="usermatch-title">Scores</h1>
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
                <td className="usermatch-table-body-column">{obj.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
  );
};

export default Score;
