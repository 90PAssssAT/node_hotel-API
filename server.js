const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Hotel Management API");
});

// import routes files
const personRoutes = require("./routes/personRoute");
const menuRoutes = require("./routes/menuRoute");

// use the routes
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// const port = 3000;
