const express = require("express");
const mongoose =require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../Models/User')(mongoose);
const nodemailer = require("nodemailer");
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
router.patch("/:id",UserController.updateUser);

//Send Email de reinitialisation
router.post("/sendemail", UserController.SendEmail);
  
//Change the password
router.post("/confirmpassword/:id", UserController.changePassword);

module.exports=router;
