import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ModalLoginSign from './ModalLoginSignup';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Home />
        <ModalLoginSign />
      </div>
    </BrowserRouter>
  );
}

export default App;
