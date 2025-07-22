import React, { useState, useEffect, useMemo } from "react";
import ReactStars from "react-rating-stars-component";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import { useParams } from "react-router-dom";

// Types

type Comment = {
  _id?: string;
  text: string;
  avatar: string;
  userName: string;
  movieId: string;
  createdAt?: string;
};

type Movie = {
  id: string;
  title: string;
  image: string;
  rate: number;
  genres: string[];
  year?: number;
  duration?: string;
  description?: string;
};

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [movieComments, setMovieComments] = useState<{ [movieId: string]: Comment[] }>({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:4000/api/films/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load movie:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:4000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => console.error("Erreur chargement utilisateur:", err));
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/comments/${id}`);
      if (!res.ok) throw new Error("Erreur lors du fetch des commentaires");

      const data = await res.json();
      const defaultAvatar = "/images/user.png";

      const transformed = data.map((comment: any) => ({
        text: comment.message,
        userName: comment.username ?? "Anonymous",
        avatar: comment.avatar ? `http://localhost:4000${comment.avatar}`
          : defaultAvatar,
        movieId: comment.filmId,
        createdAt: comment.createdAt,
      }));
      console.log(transformed)
      setMovieComments({ [id!]: transformed });
    } catch (error) {
      console.error("❌ Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!movie || !comment.trim()) return;

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:4000/api/comments/create/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: comment.trim(),
          userId,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l’envoi du commentaire");

      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Erreur POST commentaire :", error);
    }
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const userId = localStorage.getItem("userId");
    if (!userId || !id) return;

    try {
      const url = isFavorite
        ? "http://localhost:4000/api/users/favorites/remove"
        : "http://localhost:4000/api/users/favorites/add";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, movieId: id }),
      });

      if (!res.ok) throw new Error("Erreur modification favori");
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setComment((prev) => prev + emojiData.emoji);
  };

  if (loading) return <p style={{ color: "white" }}>Loading movie details...</p>;
  if (!movie) return <p style={{ color: "white" }}>Movie not found.</p>;
  if (!userData) return <p style={{ color: "white" }}>Please log in to comment or rate the movie.</p>;

  return (
    <div style={{ minHeight: "200vh", padding: "60px 80px", color: "white" }}>
      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 320px" }}>
          <img
            src={movie.image?.startsWith("http") ? movie.image : `http://localhost:4000/${movie.image}`}
            alt={movie.title}
            style={{ width: "100%", height: "500px", borderRadius: "12px" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>{movie.title}</h1>
            <button onClick={toggleFavorite} style={{ background: "none", border: "none" }}>
              <img
                src={isFavorite ? "/images/fullheart1.png" : "/images/emptyheart1.png"}
                alt="favorite"
                style={{ width: "36px", height: "36px" }}
              />
            </button>
          </div>

          <p style={{ textAlign: 'left' }}>{movie.year || "2024"} | {movie.genres?.join(", ")} | {movie.duration || "2h 30m"}</p>
          <p style={{ textAlign: 'left' }}>{movie.description || "No description available."}</p>

         <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <p style={{ margin: 0 }}>Average Rating:</p>
          <ReactStars count={5} size={30} value={movie.rate / 2} edit={false} activeColor="#ffd700" />
        </div>


         <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <p style={{ margin: 0 }}>Your Rating:</p>
            <ReactStars
              count={5}
              size={30}
              value={userRating || 0}
              onChange={(newRating) => setUserRating(newRating)}
              activeColor="#ffb700"
            />
          </div>

       <form onSubmit={handleCommentSubmit} style={{ textAlign: "left", maxWidth: "600px", margin: "0" }}>
  <div style={{ position: "relative", width: "100%" }}>
    <textarea
      value={comment}
      rows={6}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write your thoughts..."
      style={{ width: "100%", paddingRight: "40px", marginBottom: "10px", fontSize: "16px", resize: "vertical" }}
    />
    <button
      type="button"
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      style={{
        position: "absolute",
        right: "8px",
        top: "80%",
        transform: "translateY(-50%)",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "20px",
        padding: 0,
        userSelect: "none",
      }}
      aria-label="Toggle Emoji Picker"
    >
      🙂
    </button>
  </div>

  {isClient && showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}

  <button type="submit" style={{ marginTop: "10px" }}>
    Submit Comment
  </button>
</form>



          <h3 style={{ marginTop: "40px",textAlign:"left" }}>All Comments</h3>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
            {movieComments[id!]?.length > 0 ? (
              movieComments[id!].map((c) => (
                <li key={c._id} style={{ display: "flex", marginBottom: "15px" }}>
                <img src={c.avatar}
                  alt="avatar"
                  style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "10px" }}
                />

                  <div>
                    <strong>{c.userName}</strong>
                    <p style={{textAlign:"left"}}>{c.text}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
