const express = require("express");
const database = require("./Database/Database.js");
const path = require("path");
require("dotenv").config();
const cors = require('cors');


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

const Routes = require("./Routes/UserRouter.js");
const RoutesAuth = require("./Routes/AuthRouter.js");

app.use("/MyFlix",Routes); // ou le préfixe que tu veux
app.use("/MyFlix",RoutesAuth); // ou le préfixe que tu veux


app.listen(process.env.PORT, () => {
  console.log("Server is running on port ", process.env.PORT);
});