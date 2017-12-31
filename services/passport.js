const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// pull a model out of mongoose
const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // check for uniqueness of googleId record in User collection
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record
          new User({ googleId: profile.id })
            .save() // .save persists row
            .then(user => done(null, user));
        }
      });
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      // console.log("profile", profile);
    },
  ),
);
