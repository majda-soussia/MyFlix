import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from "./Item.tsx";

type Movie = {
  _id: string;
  title: string;
  image: string;
  rate: number;
  genres: string[];
};

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteMoviesDetails = async () => {
      const favoriteIds: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");

      if (!favoriteIds || favoriteIds.length === 0) {
        setFavoriteMovies([]);
        return;
      }

      try {
        // Faire plusieurs fetchs parallèles pour récupérer les détails de chaque film
        const moviePromises = favoriteIds.map(async (id) => {
          const res = await fetch(`http://localhost:4000/api/films/${id}`);
          if (!res.ok) throw new Error(`Erreur lors du fetch du film ${id}`);
          return await res.json();
        });

        const movies = await Promise.all(moviePromises);

        setFavoriteMovies(movies);
      } catch (error) {
        console.error("Erreur lors du fetch des films favoris :", error);
      }
    };

    fetchFavoriteMoviesDetails();
  }, []);

  const handleClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(90deg, rgba(54, 5, 5, 1) 0%, rgba(0, 0, 0, 1) 100%)",
        color: "#fff",
        padding: "60px 80px",
      }}
    >
      <h2 className="text-3xl font-bold mb-6">My Favorite Movies</h2>

      {favoriteMovies.length === 0 ? (
        <p className="text-gray-500">You have no favorite movies yet.</p>
      ) : (
        <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
          {favoriteMovies.map((movie) => (
           <Item
            key={movie._id}
            id={movie._id} 
            title={movie.title}
            image={movie.image}
            rate={movie.rate}
            genres={movie.genres}
            onClick={() => handleClick(movie._id)} // movie._id est string
            onHeartClick={(id) => handleClick(id)}
            isFavorite={true}
          />

          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
