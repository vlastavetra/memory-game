import React from 'react';


const Home = () => {
    return ( <>
    <div className='title-home'>MEMO MEME</div>
    <div className='home-text'>Welcome to Memo MEME. Here You can create an account with sign up button or login if you have an account.
        Memo MEME is a simple memory game build with React and Node JS, one-player or multiplayer.  
    </div>
    <div className='button-container'>
    <button className='main-button' href="/game">PLAY</button>
    </div>

    </> );
}
 
export default Home;