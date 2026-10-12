const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Hotel Management API");
});

// import routes files
const personRoutes = require("./routes/personRoute");
const menuRoutes = require("./routes/menuRoute");

// use the routes
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
// const port = 3000;
