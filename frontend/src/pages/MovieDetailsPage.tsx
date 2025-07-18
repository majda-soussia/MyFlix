import React from "react";
import styles from "./style/Home.module.css";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails.tsx";
const MovieDetailsPage: React.FC = () => {
  
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <div  className={styles.scrollable}>
          <MovieDetails/>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
