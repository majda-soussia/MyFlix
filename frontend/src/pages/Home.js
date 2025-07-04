import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
const Home = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
    <Sidebar />
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Header />
      </div>
      </div>
    
    
    
  );
};

export default Home;
