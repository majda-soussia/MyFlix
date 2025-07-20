import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Item from "./Item.tsx";
import { movies } from "../data/movies.ts";

const Favorites = () => {
  const navigate = useNavigate();
  const [favoriteMovies, setFavoriteMovies] = useState<typeof movies>([]);

  
  // Récupère les films favoris depuis localStorage
  const loadFavorites = () => {
    const favIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favs = movies.filter((movie) => favIds.includes(movie.id));
    setFavoriteMovies(favs);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // Gère l'ajout/suppression des favoris
  const toggleFavorite = (id: number) => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = stored.includes(id)
      ? stored.filter((favId: number) => favId !== id)
      : [...stored, id];

    localStorage.setItem("favorites", JSON.stringify(updated));
    loadFavorites(); // recharge les favoris après modification
  };

  // Récupère les IDs favoris pour le rendu
  const favoriteIds = favoriteMovies.map((m) => m.id);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <p className="text-gray-500">You have no favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteMovies.map((movie) => (
            <Item
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={movie.imageUrl}
              rate={movie.rating}
              genres={movie.genres}
              onClick={() => navigate(`/movie/${movie.id}`)}
              onHeartClick={toggleFavorite}
              isFavorite={favoriteIds.includes(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
