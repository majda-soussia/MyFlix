const express = require("express");
const mongoose = require("mongoose");
const Film = require("../Models/Film")(mongoose);
require("dotenv").config();

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
        type: genreNames.join(', ')
      };
    });

    res.json(filteredFilms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des films" });
  }
};
