const express = require("express");
const mongoose = require("mongoose");
const FilmController = require("../Controllers/FilmController");
const router = express.Router()

//Get All Films
router.get("/", FilmController.getAllFilms);


//update a film
router.put("/update/:id", FilmController.updateFilm);

module.exports=router;