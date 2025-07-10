import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Form.css";

const Form: React.FC = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email ||  !firstname || !lastname|| !password || !confirmPassword || !birthday || !gender) {
      alert("Please fill in all the fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {

      const res = await fetch("http://localhost:4000/MyFlix/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email , firstname, lastname, password,confirmPassword,  birthday, gender }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registered successfully!");
        navigate("/login");
      } else {
alert("❌ Error: " + (data.error || data.message || JSON.stringify(data)));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
         <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </div>
        <div>
          <label>First Name</label>
          <input type ="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First name" />
        </div>

        <div>
          <label>Last Name</label>
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last name" />
        </div>

       

        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </div>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        <hr />

        <button type="submit">Register</button>

        <div className="mt-3">
          <p>
            Already have an account?{" "}
            <a href="/login" style={{ color: "white", fontWeight: "bold" }}>
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;
