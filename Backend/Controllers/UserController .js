const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../Models/User")(mongoose);
const nodemailer = require("nodemailer");
const Film = require("../Models/Film")(mongoose);
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};


exports.createUser = async (req, res) => {
  try {
    const { email, firstname, lastname, password, birthday, gender } = req.body;

    if (!email || !firstname || !lastname || !password || !birthday || !gender) {
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
      favorites: [],
      isVerified: false
    });

    await newUser.save();

    const verificationToken = jwt.sign(
      { userId: newUser._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const verificationUrl = `http://localhost:3000/login`;

    await sendEmail(
      email,
     "Vérification de votre compte",
      `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <p>Bonjour ${firstname},</p>
          <p>Merci de vous être inscrit. Veuillez vérifier votre compte en cliquant sur le lien ci-dessous :</p>
          <p>
            <a href="${verificationUrl}" style="background-color: #007BFF; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
              Vérifier mon compte
            </a>
          </p>
          <p>Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet e-mail.</p>
          <p>Merci,</p>
          <p>L’équipe Support</p>
        </div>
      `
    );

    res.status(201).json({ message: "User registered. Please check your email." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User successfully deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const userToReturn = updatedUser.toJSON();
    res.status(200).json(userToReturn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.SendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json("Email is required");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("This email does not exist");
    }

    // Encodage sécurisé de l'ID
    const encodedId = encodeURIComponent(user._id.toString());
    const url = `http://localhost:3000/confirmpassword/${encodedId}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset your password",
      html: `
      <p>Bonjour,</p>
      <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.</p>
      <p>Veuillez cliquer sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
      <p><a href="${url}" style="color: #1a73e8; text-decoration: underline;">Réinitialiser votre mot de passe</a></p>
      <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email ou contacter notre support.</p>
      <p>Cordialement,</p>
      <p>L'équipe de support</p>
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
        return res.status(500).json("An error occurred while sending the email");
      }

      return res.status(200).json({ message: "Email sent successfully", info });
    });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json("Internal server error");
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email vérifié avec succès" });
  } catch (err) {
    res.status(400).json({ error: "Token invalide ou expiré" });
  }
};



exports.changePassword = async (req, res) => {
   const {newpassword,newpasswordComfirm} = req.body
    
    if (!newpassword || !newpasswordComfirm) {
      res.status(400).json("All fields are required");
      return;
   }
   if (newpassword !== newpasswordComfirm) {
      res.status(400).json("The two passwords do not match");
      return;
   }
   try {
 //hashing password
   const salt = await bcrypt.genSalt(10)
   const hashednewPassword = await bcrypt.hash(newpassword, salt)
   // add to the database
   const user = await User.findById(req.params.id);
   user.password=hashednewPassword;
   await user.save()
   res.status(200).json(user)
   return;
  } catch (error) {
    res.status(400).json({ error: error.message })
    return;
  }
}

exports.addToFavorites = async (req, res) => {
    try {
        const { userId, movieId } = req.body;

        // Validation des IDs
      if (!userId || !movieId) {
      return res.status(400).json({ error: "User ID and Movie ID are required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: movieId } }, // Évite les doublons
      { new: true }
    );
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ 
            message: "Movie added to favorites",
            favorites: user.favorites 
        });
    } catch (err) {
        console.error("Error in addToFavorites:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.removeFromFavorites = async (req, res) => {
    try {
        const { userId, movieId } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { favorites: movieId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ 
            message: "Movie removed from favorites",
            favorites: user.favorites 
        });
    } catch (err) {
        console.error("Error in removeFromFavorites:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Supprimer les doublons dans les favoris
    const uniqueFavorites = [...new Set(user.favorites.map(id => id.toString()))];

    // Mettre à jour le user dans la base s’il y avait des doublons
    if (uniqueFavorites.length !== user.favorites.length) {
      user.favorites = uniqueFavorites;
      await user.save();
    }

    res.status(200).json({ favorites: uniqueFavorites });
  } catch (err) {
    console.error("Error in getFavorites:", err);
    res.status(500).json({ error: "Server error" });
  }
};
