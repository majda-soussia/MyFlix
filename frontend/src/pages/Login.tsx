import React from "react";
import Form from '../components/Form.tsx';
import { useNavigate } from 'react-router-dom';
import './style/Login.css'
type LoginCredentials = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate= useNavigate();
  const handleLogin = ({ email, password }: LoginCredentials) => {
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