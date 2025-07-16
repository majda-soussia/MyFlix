import React, { useState, useMemo, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { getRandomAvatar } from "../data/avatars.ts";
import { users } from "../data/users.ts";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";

type Movie = {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  type: string;
  year?: number;
  duration?: string;
  description?: string;
};

interface MovieDetailsProps {
  movie: Movie;
  onClose?: () => void;
  isFavorite?: boolean;
  toggleFavorite?: (e: React.MouseEvent) => void;
  userRating?: number | null;
  setUserRating?: (rating: number) => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  onClose,
  userRating = null,
  setUserRating = () => {},
}) => {
  type Comment = {
    text: string;
    gender: "male" | "female";
    avatar: string;
    userName: string;
  };
  const [comment, setComment] = useState("");

  const [movieComments, setMovieComments] = useState<{ [movieId: number]: Comment[] }>(() => {
    const saved = localStorage.getItem("movieComments");
    return saved ? JSON.parse(saved) : {};
  });
  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  useEffect(() => {
    localStorage.setItem("movieComments", JSON.stringify(movieComments));
  }, [movieComments]);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment: Comment = {
        text: comment.trim(),
        gender,
        avatar: userAvatar,
        userName: `${currentUser.firstname} ${currentUser.lastname}`,
      };

      setMovieComments((prev) => {
        const updatedComments = prev[movie.id] ? [...prev[movie.id]] : [];
        updatedComments.unshift(newComment); // Add to the beginning
        return {
          ...prev,
          [movie.id]: updatedComments,
        };
      });

      setComment("");
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setComment((prev) => prev + emojiData.emoji);
  };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };
  const currentUser = users[1];
  const gender = currentUser.gender as "male" | "female";
  const userAvatar = useMemo(() => getRandomAvatar(gender), [gender]);
  return (
    <div
      style={{
        minHeight: "200vh",
        width: "100%",
        background:
          "linear-gradient(90deg,rgba(54, 5, 5, 1) 0%, rgba(0, 0, 0, 1) 6%, rgba(0, 0, 0, 1) 41%, rgba(0, 0, 0, 1) 51%, rgba(0, 0, 0, 1) 56%, rgba(0, 0, 0, 1) 77%, rgba(0, 0, 0, 1) 100%)",
        color: "#fff",
        padding: "60px 80px",
        display: "flex",
        gap: "50px",
        flexWrap: "wrap",
        boxSizing: "border-box",
      }}
    >
      <div style={{ flex: "0 0 320px" }}>
        <img
          src={movie.imageUrl}
          alt={movie.title}
          style={{
            width: "100%",
            height: "500px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      <div style={{ flex: 1, minWidth: "360px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {movie.title}
          </h1>

          <button
            onClick={toggleFavorite}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            <img
              src={
                isFavorite
                  ? "/images/fullheart1.png"
                  : "/images/emptyheart1.png"
              }
              alt="favorite"
              style={{ width: "36px", height: "36px" }}
            />
          </button>
        </div>
        <div style={{ justifyItems: "self-start" }}>
          <p style={{ color: "#ccc", marginBottom: "8px" }}>
            {movie.year || "2024"} &nbsp;|&nbsp; {movie.type || "Genre"}{" "}
            &nbsp;|&nbsp; {movie.duration || "2h 30m"}
          </p>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.6",
              marginBottom: "30px",
            }}
          >
            {movie.description ||
              "No description available for this movie. Please check back later."}
          </p>

          <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
            <p style={{ fontSize: "18px", marginTop: "10px" }}>
              Average Rating:
            </p>
            <ReactStars
              count={5}
              size={30}
              value={movie.rating / 2}
              edit={false}
              activeColor="#ffd700"
            />
          </div>

          <div style={{ marginBottom: "30px", display: "flex", gap: "20px" }}>
            <p style={{ fontSize: "18px", marginTop: "10px" }}>Your Rating:</p>
            <ReactStars
              count={5}
              size={30}
              value={userRating || 0}
              onChange={(newRating) => setUserRating(newRating)}
              activeColor="#ffb700"
            />
          </div>
          <div style={{ justifyItems: "self-start" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "0px" }}>
              Add a comment:
            </h3>

            <form
              onSubmit={handleCommentSubmit}
              style={{ margin: "0px", paddingLeft: "0px" }}
            >
              <div style={{ position: "relative", marginBottom: "10px" }}>
                <textarea
                  value={comment}
                  rows={5}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your thoughts..."
                  style={{
                    width: "170%",
                    padding: "16px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    backgroundColor: "#1e1e1e",
                    color: "#fff",
                    resize: "none",
                    marginBottom: "10px",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  aria-label="Toggle Emoji Picker"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "-140px",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "50%",
                    padding: "8px",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#fff",
                    transition: "background 0.3s",
                  }}
                >
                  🙂
                </button>
              </div>
              {isClient && showEmojiPicker && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "60px",
                    left: "1000px",
                    zIndex: 10,
                    background: "#2a2a2a",
                    borderRadius: "8px",
                    padding: "5px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              <button
                type="submit"
                style={{
                  padding: "14px 24px",
                  fontSize: "16px",
                  background: "#8A1111",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background 0.3s",
                }}
              >
                Submit Comment
              </button>
            </form>

            <h3 style={{ marginTop: "40px", fontSize: "22px" }}>
              All Comments
            </h3>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {movieComments[movie.id]?.length > 0 ? (
                movieComments[movie.id].map((c, idx) => (
                  <li
                    key={idx}
                    style={{
                      width:"800px",
                      height: "100px",
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: "15px",
                      background: "#1a1a1a",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      src={c.avatar}
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "12px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <strong style={{ color: "#fff" }}>{c.userName}</strong>
                      <p style={{ margin: 0, color: "#ddd" }}>{c.text}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p style={{ color: "#aaa" }}>
                  No comments yet. Be the first to comment!
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
