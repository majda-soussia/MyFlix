require("dotenv").config();
const mongoose = require("mongoose");
const db = {};
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
db.mongoose = mongoose;
db.url = process.env.DATABASE_URL;
db.User = require("../Models/User")(mongoose);
module.exports = db;
