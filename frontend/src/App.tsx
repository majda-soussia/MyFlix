import React from "react";
import "./App.css";
import {  Routes, Route  } from "react-router-dom";
import Login from "./pages/Login.js";
import Home from "./pages/Home.tsx";
import Welcome from './pages/welcome.tsx';
import Register from './pages/Register.js';


const App: React.FC =()=> {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Home />} /> 
        <Route path="/register" element={<Register />} />
      </Routes>
  </div>
  );
}

export default App;