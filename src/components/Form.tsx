import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style/Form.css';

const Form: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill in all the fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login successful!");
      
        navigate("/home"); 
      } else {
        alert("❌ " + (data.error || data.message || "Login failed"));
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
        </div>

        <hr />

        <div>
          <button type="submit">LOGIN</button>
          <a href="/FormMail" style={{ color: "white", fontWeight: "bold", marginLeft: "10px" }}>
            Forgot Password?
          </a>
        </div>

        <div className="mt-3">
          <p>
            Don't have an account?{" "}
            <a href="/register" style={{ color: "white", fontWeight: "bold" }}>
              REGISTER
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;
