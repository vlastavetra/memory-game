import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import  { Provider } from "./../src/context/context.js";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
  <App />
  </Provider>
);
