import React from "react";
import styles from "./style/Home.module.css";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
import Trend from "../components/Trend.tsx";
import Recomandation  from "../components/Recomandation.tsx";
import ListMovies from "../components/ListMovies.tsx";
const Home:React.FC= () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <div className={styles.scrollable}>
          <Trend />
          <Recomandation />
        </div>
      </div>
    </div>
  );
};
export default Home;
