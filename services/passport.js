const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// pull a model out of mongoose
const User = mongoose.model("users");

// note that this is oauth strategy agnostic
// since we use user.id instead of profile.id
// this turns a user into an id
// (puts information into cookie)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// turn id back into user (pull user out of cookie)
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // check for uniqueness of googleId record in User collection
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile ID
        return done(null, existingUser);
      }
      // we don't have a user record with this ID, make a new record
      const user = await new User({ googleId: profile.id }).save(); // .save persists row
      done(null, user);
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      // console.log("profile", profile);
    },
  ),
);
