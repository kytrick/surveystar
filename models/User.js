const mongoose = require("mongoose");
// const Schema = mongoose.Schema; below is es2015 destructuring syntax instead
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
});

// load a schema into mongoose
mongoose.model("users", userSchema);
