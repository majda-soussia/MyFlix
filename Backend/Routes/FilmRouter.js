const express = require("express");
const mongoose = require("mongoose");
const FilmController = require("../Controllers/FilmController");
const router = express.Router()

//Get All Films
router.get("/", FilmController.getAllFilms);

//GetFilm by ID
router.get("/title/:title", FilmController.getFilmByTitle);

//Get Film by Type
router.get("/genre/:genres",FilmController.getFilmByType)

//Create a film
router.post("/addFilm", FilmController.upload.single("image"), FilmController.createFilm);
router.get("/films/:id", FilmController.getFilmById);
module.exports = router;