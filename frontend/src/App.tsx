import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Welcome from "./pages/welcome.tsx";
import Register from "./pages/Register.tsx";
import Sendmail from "./pages/Sendmail.tsx";
import PasswordReset from "./pages/PasswordReset.tsx";
import Account from "./pages/AccountSetting.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import MovieDetails from "./pages/MovieDetailsPage.tsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.tsx";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/FormMail" element={<Sendmail />} />
        <Route path="/confirmpassword/:id" element={<PasswordReset />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/favorites/" element={<FavoritesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
