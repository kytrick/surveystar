const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User"); // models must come before passport
require("./services/passport"); // models must come before passport

mongoose.connect(keys.mongoURI);
const app = express();

//const authRoutes = require('./routes/authRoutes');
//authRoutes(app);
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
