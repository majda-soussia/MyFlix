import React from "react";
import Form from '../components/Form.tsx';
import { useNavigate } from 'react-router-dom';
import './style/Login.css'
const Login: React.FC = () => {
  const navigate= useNavigate();
 
  return (
    <div className="login">
      <Form />
    </div>
  );
};

export default Login ;