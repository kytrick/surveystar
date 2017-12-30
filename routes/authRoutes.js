const passport = require("passport");

module.exports = app => {
  // asking google for the user's profile and email information.
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    }),
  );

  app.get("/auth/google/callback", passport.authenticate("google"));
};
