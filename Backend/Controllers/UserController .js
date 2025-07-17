const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../Models/User")(mongoose);
const nodemailer = require("nodemailer");

const Film = require("../Models/Film")(mongoose);

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

exports.createUser = async (req, res) => {
  try {
    const { email, firstname, lastname, password, confirmPassword, birthday, gender } = req.body;

    // Check required fields
    if (!email || !firstname || !lastname || !password || !confirmPassword || !birthday || !gender) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "This email is already used." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      gender,
      favorites: []
    });

    await newUser.save();

    // Optionally send a safe response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        birthday: newUser.birthday,
        gender: newUser.gender
      }
    });
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
        <p>Dear user,</p>
        <p>We would like to inform you that a password reset event has been triggered for your account.</p>
        <p>To complete the reset process and choose a new password, please click the following link:</p>
        <a href="${url}">${url}</a>
        <p>If you did not initiate this password reset request, please contact our support team immediately.</p>
        <p>Thank you for your understanding and cooperation.</p>
        <p>Best regards,</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json("An error occurred while sending the email");
      }
        res.status(200).json({ message: "Email sent successfully", info });
      });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json("Internal server error");
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
  await User.findByIdAndUpdate(
  req.params.id,
  { password: hashednewPassword },
  { runValidators: true } // optional
);
res.status(200).json({ message: "Password updated successfully." });

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

        res.status(200).json({ favorites: user.favorites });
    } catch (err) {
        console.error("Error in getFavorites:", err);
        res.status(500).json({ error: "Server error" });
    }
};
