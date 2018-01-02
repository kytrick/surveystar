const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/prod");
require("./models/User"); // models must come before passport
require("./services/passport"); // models must come before passport

mongoose.connect(keys.mongoURI);
const app = express();

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
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
