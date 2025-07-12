const express = require("express");
const database = require("./Database/Database.js");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database.mongoose
  .connect(process.env.DATABASE_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api/users", require("./Routes/UserRouter"));

app.use(cors({
  origin: 'http://localhost:3000'
}));

const UserRoutes = require("./Routes/UserRouter.js");
const FilmRoutes = require('./Routes/FilmRouter.js');
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));
app.use("/api/users",UserRoutes);
app.use("/api/auth", require("./Routes/AuthRouter.js"));
app.use("/api/films", FilmRoutes);


app.listen(process.env.PORT, () => {
  console.log("Server is running on port ", process.env.PORT);
});