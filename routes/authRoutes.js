const passport = require('passport');

module.exports = app => {
  // asking google for the user's profile and email information.
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get(
    '/auth/google/callback', // oauth flow
    passport.authenticate('google'), // passport middleware
    (req, res) => {
      // go away
      res.redirect('/surveys');
    },
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
