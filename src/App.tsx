import React from "react";
import "./App.css";
import {  Routes, Route  } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Welcome from './pages/welcome.tsx';
import Register from './pages/Register.tsx';
import Sendmail from "./pages/Sendmail.tsx";
import PasswordReset from "./pages/PasswordReset.tsx";
import MovieDetailsPage  from "./pages/MovieDetailsPage.tsx";
import AccountSetting from "./pages/AccountSetting.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import SearchMovies from "./pages/SearchMovies.tsx";

const App: React.FC =()=> {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Home />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/FormMail" element={<Sendmail/>} />   
        <Route path="/confirmpassword/:id" element={<PasswordReset/>} />   
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/account/:id" element={<AccountSetting/>} />
        <Route path="/favourites" element={<FavoritesPage/>} />
        <Route path="/search/:id" element={<SearchMovies />} />
         
      </Routes>
  </div>
  );
}

export default App;