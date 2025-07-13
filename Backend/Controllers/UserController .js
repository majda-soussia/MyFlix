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
      gender
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
  if(!email){
    res.status(400).json("Email is required");
      return;
  }
  const user = await User.findOne({ email }); //nlawj aal mail fl database
  if (user){
    const url = `http://localhost:3000/confirmpassword/${user._id}`;
    const transporter = nodemailer.createTransport({
    service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
     const mailOptions = {
      from: "sirineraies20@gmail.com",
      to: email,
      subject: "Reset your password",
      html: `Dear user,
        <br/><br/>
        We would like to inform you that a password reset event has been triggered for your account. To complete the reset process and choose a new password, please click on the following link: ${url}.
        <br/><br/>
        This link will redirect you to a page where you can enter your new password. We recommend choosing a strong password and keeping it confidential to ensure the security of your account.
        <br/><br/>
        If you did not initiate this password reset request, please contact our support team immediately so we can take the necessary steps to secure your account.
        <br/><br/>
        If you have any questions or technical issues, feel free to contact us. We are here to help you at any time.
        <br/><br/>
        Thank you for your understanding and cooperation.
        <br/>
        Best regards,`,
     };

     transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).json("An error occurred while sending the email");
      }else {
        res.status(200).json(" An email has been sent successfully");
      }})
    }
    else {
      res.status(400).json(" this email does not exist");
    } 
}

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

