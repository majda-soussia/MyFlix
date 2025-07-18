import React from "react";
import FormRegister from "../components/FormRegister.tsx";
import { useNavigate } from "react-router-dom";
import "./style/Register.css";

type RegisterData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthday: string;
  gender: string;
};
const Register: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = ({
    firstname,
    lastname,
    email,
    password,
    birthday,
    gender,
  }: RegisterData) => {
    console.log(
      "login attempt:",
      firstname,
      lastname,
      email,
      password,
      birthday,
      gender
    );
    alert(`welcome,${firstname}!`);
    navigate("/login");
  };
  return (
    <div className="register">
<FormRegister onRegister={handleLogin} />
    </div>
  );
};

export default Register;
