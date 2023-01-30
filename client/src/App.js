import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';
import ModalLoginSign from './ModalLoginSignup';

function App() {
  return (
    <BrowserRouter>
   <ModalLoginSign/>
    {/* <Routes>
     <Route path="/" element={<WelcomePage/>}/>
     <Route path="/settings" element={<Settings/>}/>
    <Route path="/home" element={<HomePage />} /> 
    </Routes> */}
  </BrowserRouter>
  );
}

export default App;
