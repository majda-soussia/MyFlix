import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Item from "./Item.tsx";
import { mockMovies, FavoriteItem } from "../data/mockMovies.ts";
import MovieDetails from "../pages/MovieDetailsPage.tsx";
const Favorites = () => {
  const [trendingItems, setTrendingItems] = useState<FavoriteItem[]>(mockMovies);
  const [selectedMovie, setSelectedMovie] = useState<FavoriteItem | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]); 
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteItem[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (storedFavorites.length === 0) {
      const defaultFavorites = [1, 2]; 
      localStorage.setItem("favorites", JSON.stringify(defaultFavorites));
      setFavorites(defaultFavorites);
    } else {
      setFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    const favs = trendingItems.filter((movie) => favorites.includes(movie.id));
    setFavoriteMovies(favs);
  }, [trendingItems, favorites]);
  const handleClick = (id: number) => {
    navigate(`/movie/${id}`);
  };
  const handleHeartClick = (movieId: number) => {
    const updated = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div style={{
      minHeight: "200vh",
      width: "100%",
      background:
        "linear-gradient(90deg,rgba(54, 5, 5, 1) 0%, rgba(0, 0, 0, 1) 6%, rgba(0, 0, 0, 1) 41%, rgba(0, 0, 0, 1) 51%, rgba(0, 0, 0, 1) 56%, rgba(0, 0, 0, 1) 77%, rgba(0, 0, 0, 1) 100%)",
      color: "#fff",
      padding: "60px 80px",
      }}>
      <h2 className="text-3xl font-bold mb-6">My Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <p className="text-gray-500">You have no favorite movies yet.</p>
      ) : (
        <div style={{
          display:"flex",
          gap:"50px"
        }} >
          {favoriteMovies.map((item) => (
            <Item
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            rate={item.rate}
            genres={item.genres}
            onClick={() => handleClick(item.id)}
            onHeartClick={handleHeartClick}
            isFavorite={favorites.includes(item.id)}
          />
          
          ))}
        </div>
        
      )}
      <div>
        {selectedMovie && (
          <MovieDetails/>
        )}
      </div>
    </div>
  );
};

export default Favorites;
