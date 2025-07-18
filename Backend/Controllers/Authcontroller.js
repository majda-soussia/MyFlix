const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User")(require("mongoose"));
const JWT_SECRET = process.env.JWT_SECRET || "secret_key_example";


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email" });
    }

 // Nettoyer favorites : enlever null, undefined, 'undefined' et doublons
const seen = new Set();
const uniqueFavorites = [];

user.favorites.forEach(fav => {
  if (fav && fav !== "undefined" && !seen.has(fav.toString())) {
    seen.add(fav.toString());
    uniqueFavorites.push(fav);
  }
});

// Mise à jour si besoin
if (uniqueFavorites.length !== user.favorites.length) {
  user.favorites = uniqueFavorites;
  await user.save();
}

console.log("Favorites to send cleaned:", uniqueFavorites);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
console.log("Favorites to send:", uniqueFavorites);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        favorites: uniqueFavorites // prêt à stocker dans le localStorage
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};