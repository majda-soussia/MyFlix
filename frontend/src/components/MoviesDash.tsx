import React, { useState } from "react";
import "./style/MoviesDash.css";
import { movies as initialMovies } from "../data/movies.ts";

type Movie = {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  type: string;
  description: string;
};

const MoviesDash = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    imageUrl: string;
    image: File | null;
    rating: number;
    type: string;
    description: string;
  }>({
    title: "",
    imageUrl: "",
    image: null,
    rating: 0,
    type: "",
    description: "",
  });

  const handleDelete = (id: number) => {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
  };

  const handleEdit = (id: number) => {
    const movie = movies.find((m) => m.id === id);
    if (movie) {
      setEditingMovie(movie);
      setFormData({
        title: movie.title,
        imageUrl: movie.imageUrl,
        image: null, // new upload can replace this
        rating: movie.rating,
        type: movie.type,
        description: movie.description,
      });
      setIsFormVisible(true);
    }
  };
  const handleAddMovieClick = () => {
    setEditingMovie(null);
    setFormData({
      title: "",
      imageUrl: "",
      image: null,
      rating: 0,
      type: "",
      description: "",
    });
    setIsFormVisible(true);
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const movieData: Movie = {
      id: editingMovie ? editingMovie.id : Date.now(),
      title: formData.title,
      imageUrl: formData.imageUrl,
      rating: formData.rating,
      type: formData.type,
      description: formData.description,
    };

    if (editingMovie) {
      setMovies(
        movies.map((m) => (m.id === editingMovie.id ? movieData : m))
      );
    } else {
      setMovies([...movies, movieData]);
    }

    setIsFormVisible(false);
    setEditingMovie(null);
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };
  
  return (
    <div className="movie-dashboard">
      <div>
        <h2 className="dashboard-title">Movie List</h2>
        <button onClick={handleAddMovieClick} className="Add">
          Add Movie
        </button>
      </div>

      {isFormVisible && (
        <form className="movie-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Preview"
              style={{
                width: "100px",
                height: "150px",
                objectFit: "cover",
                marginTop: "10px",
              }}
            />
          )}

          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            step="0.1"
            min="0"
            max="10"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type (e.g. Action, Drama)"
            value={formData.type}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {editingMovie ? "Update Movie" : "Add Movie"}
          </button>
        </form>
      )}

      <div className="movie-info-card">
        <table className="movie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Rating</th>
              <th>Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    style={{ width: 60 }}
                  />
                </td>
                <td>{movie.rating}</td>
                <td>{movie.type}</td>
                <td>{movie.description}</td>
                <td>
                  <img
                    src="/images/edit.png"
                    alt="Edit"
                    title="Edit"
                    onClick={() => handleEdit(movie.id)}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                  <img
                    src="/images/poubelle.png"
                    alt="Delete"
                    title="Delete"
                    onClick={() => handleDelete(movie.id)}
                    style={{ width: 24, height: 24, cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoviesDash;
