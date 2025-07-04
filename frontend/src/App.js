import logo from "./logo.svg";
import "./App.css";
import {  Routes, Route  } from "react-router-dom";
import Login from "./pages/Login.js";
import Home from "./pages/Home";
import Welcome from './pages/welcome.tsx';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Home />} /> {/* Home has nested routes */}
      </Routes>
  </div>
  );
}

export default App;