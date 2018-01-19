const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  // watch for post requests that are made to api/stripe route
  app.post('api/stripe', (req, res) => {
    console.log(req.body);
  });
};
