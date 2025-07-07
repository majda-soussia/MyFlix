import React, { useState } from "react";
import './style/Form.css'
type LoginCredentials = {
  email: string;
  password: string;
};
type FormProps = {
  onLogin: (credentials: LoginCredentials) => void;
};

export const Form: React.FC<FormProps> = ({onLogin}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all the fields!");
      return; 
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div><hr></hr>

        <div >
          <button type="submit" >LOGIN</button>
          <a href="#" style={{ color:"rgb(255, 255, 255)", fontWeight: 'bold'}}>Forgot Password?</a>
        </div>

        <div className="mt-3">
          <a href="register" style={{ color: "rgb(255, 255, 255)" , fontWeight: 'bold'}}>REGISTER</a>
        </div>
      </form>
    </div>
  );
}
export default Form;