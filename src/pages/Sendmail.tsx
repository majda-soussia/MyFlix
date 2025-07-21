import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/Login.css";
import EmailForm from "../components/EmailForm.tsx";


const Sendmail: React.FC = () => {
  const navigate = useNavigate();
 
  return (
    <div className="login">
      <EmailForm />    </div>
  );
};

export default Sendmail;
