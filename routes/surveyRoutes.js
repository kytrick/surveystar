const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

module.exports = app => {
  // check if user is logged in and authenticated
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    // check that the user has enough credits
  });
};
