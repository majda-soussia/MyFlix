const express = require("express");
const mongoose = require("mongoose");
const Film = require("../Models/Film")(mongoose);
require("dotenv").config();
const multer = require("multer");
const path = require("path");

exports.getAllFilms = async (req, res) => {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.API_KEY_FILM
    }
  };

  const genresMap = {
    28: "Action",
    12: "Aventure",
    16: "Animation",
    35: "Comédie",
    80: "Crime",
    99: "Documentaire",
    18: "Drame",
    10751: "Famille",
    14: "Fantastique",
    36: "Histoire",
    27: "Horreur",
    10402: "Musique",
    9648: "Mystère",
    10749: "Romance",
    878: "Science-Fiction",
    10770: "Téléfilm",
    53: "Thriller",
    10752: "Guerre",
    37: "Western"
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const filteredFilms = data.results.map(film => {
      const genreNames = film.genre_ids.map(id => genresMap[id]).filter(Boolean);

      return {
        id: film.id,
        title: film.title,
        description: film.overview,
        image: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
        releaseDate: film.release_date,
        rate: film.vote_average,
        type: genreNames.join(', '),
      };
    });

    res.json(filteredFilms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des films" });
  }
};

//fetch la liste des films
const fetchPopularFilmsFromAPI = async () => {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.API_KEY_FILM
    }
  };

  const genresMap = {
    28: "Action", 12: "Aventure", 16: "Animation", 35: "Comédie",
    80: "Crime", 99: "Documentaire", 18: "Drame", 10751: "Famille",
    14: "Fantastique", 36: "Histoire", 27: "Horreur", 10402: "Musique",
    9648: "Mystère", 10749: "Romance", 878: "Science-Fiction",
    10770: "Téléfilm", 53: "Thriller", 10752: "Guerre", 37: "Western"
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data.results.map(film => {
    const genreNames = film.genre_ids.map(id => genresMap[id]).filter(Boolean);
    return {
      id: film.id,
      title: film.title,
      description: film.overview,
      image: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
      releaseDate: film.release_date,
      rate: film.vote_average,
      genres: genreNames,
    };
  });
};


exports.getFilmByTitle = async (req, res) => {
  const titleParam = req.params.title.toLowerCase();

  try {
    // Chercher dans MongoDB
    const localFilms = await Film.find({
      title: { $regex: new RegExp(titleParam, "i") }
    });

    if (localFilms.length > 0) {
      return res.status(200).json(localFilms);
    }

    // Sinon, chercher dans la liste de films populaires de l'API
    const apiFilms = await fetchPopularFilmsFromAPI();
    const matchedFilms = apiFilms.filter(f =>
      f.title.toLowerCase().includes(titleParam)
    );

    if (matchedFilms.length === 0) {
      return res.status(404).json({ error: "Film non trouvé." });
    }

    return res.status(200).json(matchedFilms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur lors de la recherche du film" });
  }
};

exports.getFilmByType = async (req, res) => {
  const genreParam = req.params.genres.toLowerCase();

  try {
    // Rechercher dans MongoDB
    const localFilms = await Film.find({
      genres: { $elemMatch: { $regex: new RegExp(genreParam, 'i') } }
    });

    if (localFilms.length > 0) {
      return res.status(200).json(localFilms);
    }

    // Sinon, récupérer les films de l'API
    const apiFilms = await fetchPopularFilmsFromAPI();
    const matchedFilms = apiFilms.filter(film =>
      film.genres.some(g => g.toLowerCase().includes(genreParam))
    );

    if (matchedFilms.length === 0) {
      return res.status(404).json({ error: "Aucun film trouvé pour ce genre." });
    }

    return res.status(200).json(matchedFilms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur lors de la recherche par genre." });
  }
};


//uploader image avec multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, fileName);
  },
});
exports.upload = multer({ storage });

exports.createFilm = async (req, res) => {
  const { title, description, rate, genres, releaseDate } = req.body

  if (!title || !description || !rate || !genres || !releaseDate) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const imagePath = req.file ? `Uploads/${req.file.filename}` : "";

  try {
    const film = new Film({
      title,
      image: imagePath || "",
      description,
      rate,
      genres: Array.isArray(genres) ? genres : genres.split(',').map(g => g.trim()),
      releaseDate: new Date(releaseDate),
    });
    await film.save();
    res.status(201).json(film);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
