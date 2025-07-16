const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../Models/User")(mongoose);
const nodemailer = require("nodemailer");

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
      gender
    });

    await newUser.save();

    const userToReturn = newUser.toJSON();
    res.status(201).json(userToReturn);
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