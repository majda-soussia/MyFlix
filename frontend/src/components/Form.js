import React, { useState } from "react";
import './style/Form.css'

export const Form = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => { 
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all the fields!");
      return; // On arrête la fonction si invalides
    }
    if (onLogin) {
      onLogin({ email, password });
    }
    
  };

  return (
    <div >
     
      <form onSubmit={handleSubmit} >

        <div >
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div><hr></hr>

        <div >
          <button type="submit" >LOGIN</button>
          <a href="#" style={{ color:"rgb(255, 255, 255)", fontWeight: 'bold'}}>Forgot Password?</a>
        </div>

        <div lassName="mt-3">
          <a href="#" style={{ color: "rgb(255, 255, 255)" , fontWeight: 'bold'}}>REGISTER</a>
        </div>
      </form>
    </div>
  );
}
export default Form;