import React from 'react';
import logo from './logo.png'
import './Home.css'




const Home = () => {
  
    
   
    return ( <>
    <div className='title-home'>MEMO MEME</div>
    <div className='logo-container'>
    <img src={logo} alt="" />
    </div>
  

    <div className='home-text'>Welcome to Memo MEME. Here You can create an account with sign up button or login if you have an account.
        Memo MEME is a simple memory game build with React and Node JS, one-player or multiplayer.  
    </div>
    <div className='button-container'>
    <a href="/game">   
    <button className='main-button'>PLAY</button>
    </a>
    </div>

    </> );
}
 
export default Home;