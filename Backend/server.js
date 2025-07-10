require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const path = require("path");
const database = require("./Database/Database.js");
const app = express();
app.use(express.json());
app.use("/api/users", require("./Routes/UserRouter"));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB 
database.mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));



// Error Handling
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
