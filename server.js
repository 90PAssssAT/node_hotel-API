const express = require("express");
const app = express();
const db = require("./db");
const passport = require("./Auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(passport.initialize());

//middleware function to log request details
// const logRequest = (req, res, next) => {
//   console.log(
//     `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`,
//   );
//   next();
// };
// app.use(logRequest);

const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", (req, res) => {
  res.send("Welcome to the Hotel Management API");
});

// import routes files
const personRoutes = require("./routes/personRoute");
const menuRoutes = require("./routes/menuRoute");

// use the routes
app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
