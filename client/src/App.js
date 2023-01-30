import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Score from './pages/Score';
import Game from './pages/Game';
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/score" element={<Score />} />
          <Route path="/game" element={<Game />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
