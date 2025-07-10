const express = require("express");
const mongoose = require("mongoose");
const FilmController = require("../Controllers/FilmController");
const router = express.Router()

router.get("/", FilmController.getAllFilms);

module.exports = router;