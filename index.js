const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // models must come before passport
require('./services/passport'); // models must come before passport

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey], // key used to encrypt our cookie
  }),
);

app.use(passport.initialize());
app.use(passport.session());

//const authRoutes = require('./routes/authRoutes');
//authRoutes(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// make sure express handles production correctly
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  //like main.js or main.class
  // hey express, if you don't know what to do, check in here!
  app.use(express.static('client/build'));

  // Express will serve up the index.html profile
  // if it doesn't recognize the route
  // catchall
  const path = requires('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
