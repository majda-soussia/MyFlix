import React from "react";
import FormRegister from '../components/FormRegister';
import { useNavigate } from 'react-router-dom';
import './style/Register.css'


const Register = () => {
  const navigate= useNavigate();
  const handleLogin = ({ nom, prenom, email, password, birthday,gender }) => {
    console.log("login attempt:", nom, prenom, email, password, birthday,gender);
    alert(`welcome,${nom}!`);
    navigate('/login');
  };
  return (
    <div className="register">
      <FormRegister onLogin={handleLogin} />
    </div>
  );
};

export default Register ;