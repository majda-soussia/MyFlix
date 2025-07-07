import React from "react";
import FormRegister from "../components/FormRegister";
import { useNavigate } from "react-router-dom";
import "./style/Register.css";

type RegisterData = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  birthday: string;
  gender: string;
};
const Register: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = ({
    nom,
    prenom,
    email,
    password,
    birthday,
    gender,
  }: RegisterData) => {
    console.log(
      "login attempt:",
      nom,
      prenom,
      email,
      password,
      birthday,
      gender
    );
    alert(`welcome,${nom}!`);
    navigate("/login");
  };
  return (
    <div className="register">
      <FormRegister onLogin={handleLogin} />
    </div>
  );
};

export default Register;
