import React from "react";
import logo from "./logo.png";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="memory-meme-logo" />
      </div>

      <div className="home-text">Welcome to Memo MEME. Here you can create an account with the register button or login 
      if you have an account. Memo MEME is a simple memory game built with React and Node JS, single or multiplayer. 
      On the game page, select 2 cards, until you find 2 identical cards. As soon as you find 2 identical cards, you win points.</div>
      <div className="button-container">
        <a href="/game">
          <button className="main-button">PLAY</button>
        </a>
      </div>
    </>
  );
};

export default Home;
