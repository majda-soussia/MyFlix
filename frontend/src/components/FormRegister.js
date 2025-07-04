import React, { useState } from "react";
import './style/Form.css'

export const Form = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  
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
          <label htmlFor="Nom">First Name</label>
          <input
            type="text"
            name="nom"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Enter your first name"
          />
        </div>

        <div >
          <label htmlFor="Prenom">Last Name</label>
          <input
            type="text"
            name="premon"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Enter your last name"
          />
        </div>

        <div >
          <label htmlFor="Email">Email</label>
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
        </div>
        
        <div >
          <label htmlFor="password">Confirm your password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>

        <div>
            <label htmlFor="birthday">Date of Birth</label>
            <input
                type="date"
                name="birthday"
                id="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
            />
            </div>

            <div>
            <label htmlFor="gender">Gender</label>
            <select
                name="gender"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <option value="Female">Select your gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
            </select>
            </div>

        
        <hr></hr>

        <div >
          <button type="submit" >LOGIN</button>
        </div>

        <div lassName="mt-3">
          <p>You have already an account ? 
          <a href="login" style={{ color: "rgb(255, 255, 255)" , fontWeight: 'bold'}}> Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Form;