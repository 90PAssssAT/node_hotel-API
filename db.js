const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {});
// mongoose.connect(process.env.MONGODB_URI_LOCAL, {});

const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB Server");
});
db.on("error", console.error.bind(console, "connection error:"));
module.exports = db;
