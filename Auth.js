const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const Person = require("./models/Person");
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
module.exports = passport;
