import React from "react";
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import './style/Login.css'


const Login = () => {
  const navigate= useNavigate();
  const handleLogin = ({ email, password }) => {
    console.log("login attempt:", email, password);
    alert(`welcom,${email}!`);
    navigate('/home');
  };
  return (
    <div className="login">
      <Form onLogin={handleLogin} />
    </div>
  );
};

export default Login ;