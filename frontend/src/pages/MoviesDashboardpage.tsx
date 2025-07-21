import React from "react";
import styles from "./style/Home.module.css";
import Sidebar from "../components/Sidebaradmine.tsx";
import Header from "../components/HeaderAdmin.tsx";
import MoviesDash from "../components/MoviesDash.tsx";
const MoviesDashboardpage:React.FC= () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <div className={styles.scrollable}>
          <MoviesDash />
        </div>
      </div>
    </div>
  );
};
export default MoviesDashboardpage;