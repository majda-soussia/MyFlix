import React from "react";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
const Home:React.FC= () => {
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
