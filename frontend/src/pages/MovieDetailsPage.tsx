import React from "react";
import styles from "./style/Home.module.css";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
import { useParams } from "react-router-dom";
import { trendingItems } from "../data/movies.ts";
import MovieDetails from "../components/MovieDetails.tsx";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movie = trendingItems.find((item) => item.id === Number(id));

  if (!movie) {
    return <p style={{ color: "white", padding: "20px" }}>Movie not found.</p>;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <div  className={styles.scrollable}>
          <MovieDetails
            movie={movie}
            onClose={() => {}}
            isFavorite={false}
            toggleFavorite={() => {}}
            userRating={null}
            setUserRating={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;