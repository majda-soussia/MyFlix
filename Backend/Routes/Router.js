const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User")(require("mongoose"));
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found'});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { email, firstname, lastname, password, birthday, gender } = req.body;
    if (
      !email ||
      !firstname ||
      !lastname ||
      !password ||
      !birthday ||
      !gender
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "This email is already used." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      gender,
    });
    await newUser.save();
    const userToReturn = newUser.toJSON();

    res.status(201).json(userToReturn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User successfully deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updateUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updateUser) {
      return res.status(404).json({ error: "User not found." });
    }
    const userToReturn = updateUser.toJSON();
    res.status(200).json(userToReturn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
