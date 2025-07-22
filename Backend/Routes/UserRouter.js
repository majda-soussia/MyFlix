const express = require("express");
const mongoose =require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../Models/User')(mongoose);

const UserController = require("../Controllers/UserController ");

//Get All users
router.get("/", UserController.getAllUsers);

//Get user by his ID
router.get("/:id",UserController.getUserById);

//Create a new user
router.post("/register", UserController.createUser);

//Delete a user by his ID
router.delete("/:id",UserController.deleteUser);

//Update a user by his ID
router.put("/:id",UserController.updateUser);

router.get("/verify-email", UserController.verifyEmail);

//Send Email to change a password
router.post("/sendemail", UserController.SendEmail);

//Change the password
router.post("/confirmpassword/:id", UserController.changePassword);

router.post("/favorites/add", UserController.addToFavorites); 

router.post("/favorites/remove", UserController.removeFromFavorites);

router.get("/favorites/:userId", UserController.getFavorites);

module.exports = router;