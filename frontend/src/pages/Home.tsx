import React from "react";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
import Trend from "../components/Trend.tsx";
const Home: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ height: "100vh" , overflowY: "auto"}}>
          <Trend />
        </div>
      </div>
    </div>
  );
};
export default Home;
