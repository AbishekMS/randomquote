import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
//import Sample from './prob5';
import Rand from './project';
//import Clock from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Rand/>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
