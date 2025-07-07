import React, { useState } from "react";
import './style/Form.css'
type RegisterData = {
  email: string;
  nom: string;
  prenom: string;
  password: string;
  birthday: string;
  gender: string;
};
type FormProps = {
  onLogin: (data: RegisterData) => void;
};
export const Form:React.FC<FormProps>= ({onLogin}) => {
  const [email, setEmail] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    if (!email || !password || !nom || !prenom || !birthday || !gender) {
      alert("Please fill in all the fields!");
      return;
    }
    if (onLogin) {
      onLogin({ email, password, nom, prenom, birthday, gender });
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNom(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrenom(e.target.value)}
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
        
        <div >
          <label htmlFor="password">Confirm your password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)}
            />
            </div>

            <div>
            <label htmlFor="gender">Gender</label>
            <select
                name="gender"
                id="gender"
                value={gender}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
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

        <div className="mt-3">
          <p>You have already an account ? 
          <a href="login" style={{ color: "rgb(255, 255, 255)" , fontWeight: 'bold'}}> Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Form;