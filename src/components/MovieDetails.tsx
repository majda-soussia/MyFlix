import React from "react";
import ReactStars from "react-rating-stars-component";

interface MovieDetailsProps {
  movie: {
    _id: string;
    title: string;
    image: string;
    rate: number;
    genres: string[];
    releaseDate?: string;
    description?: string;
  };
  onClose: () => void;
  isFavorite: boolean;
  toggleFavorite: (e: React.MouseEvent) => void;
  userRating: number | null;
  setUserRating: (rating: number) => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  onClose,
  isFavorite,
  toggleFavorite,
  userRating,
  setUserRating,
}) => {
  const year = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : "2024";

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        marginTop: "40px",
        color: "white",
        gap: "30px",
        padding: "30px",
        borderRadius: "8px",
        background:
          "linear-gradient(90deg, rgba(32, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 30%, rgba(0, 0, 0, 0.95) 70%, rgba(32, 0, 0, 1) 100%)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "26px",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 1000,
        }}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Favorite Button */}
      <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <button
          onClick={toggleFavorite}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img
            src={
              isFavorite
                ? "/images/fullheart1.png"
                : "/images/emptyheart1.png"
            }
            alt="favorite"
            style={{ width: "40px", height: "40px" }}
          />
        </button>
      </div>

      {/* Image */}
      <img
        src={movie.image}
        alt={movie.title}
        style={{
          width: "260px",
          height: "380px",
          borderRadius: "6px",
          objectFit: "cover",
        }}
      />

      {/* Info */}
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
          {movie.title}
        </h2>

        <p style={{ color: "#ccc", marginBottom: "6px", fontSize: "16px" }}>
          {year} &nbsp;|&nbsp; {movie.genres.join(", ")} &nbsp;|&nbsp; 2h 38m
        </p>

        <p style={{ fontSize: "17px", marginBottom: "20px", lineHeight: "1.6" }}>
          {movie.description || "No description available for this movie."}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "20px" }}>
          <ReactStars
            size={22}
            count={5}
            color="#444"
            activeColor="#f5c518"
            value={userRating ?? movie.rate / 2}
            isHalf={true}
            edit={true}
            onChange={(newRating) => {
              setUserRating(newRating * 2);
            }}
          />
          <span style={{ color: "#f5c518", fontWeight: 600, fontSize: "16px", whiteSpace: "nowrap" }}>
            ⭐ {movie.rate}/10
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
