import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo.png";
import "./Home.css";
import { useContext } from "react";
import Context, { Provider } from "../context/context";
import { useEffect } from "react";

const Home = () => {
  const { getUserInfos, currentUser, loginUser } = useContext(Context);
  const token = localStorage.getItem("token");

useEffect(() => {
    getUserInfos().catch(error => {
      console.error(error.message);
    });
  }, [getUserInfos]);

  return (
    <>
      {loginUser ? (
        <div>
          <div className="welcome-user-message">
            Welcome to your Memory MEME Account,
            {currentUser.username}
          </div>

          <div className="logo-container">
            <img src={logo} alt="memory-meme-logo" />
          </div>
          <div>"Score component with current user's last game score and highest score"</div>
          <div className="button-container">
            <NavLink to="/game">
              <button className="main-button">PLAY</button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div>
          <div className="logo-container">
            <img src={logo} alt="memory-meme-logo" />
          </div>

          <div className="home-text">Welcome to Memo MEME. Here you can create an account with the register button or login if you have an account. Memo MEME is a simple memory game built with React and Node JS, single or multiplayer. On the game page, select 2 cards, until you find 2 identical cards. As soon as you find 2 identical cards, you win points.</div>
          <div className="button-container">
            <NavLink to="/game">
              <button className="main-button">PLAY</button>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
