import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/Login.css";
import PasswordResetForm from "../components/PasswordResetForm.tsx";


const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
 
  return (
    <div className="login">
      <PasswordResetForm/>   </div>
  );
};

export default PasswordReset;
