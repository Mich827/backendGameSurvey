const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  type: String,
  support: String,
  frequence: String,
  favorite: [],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
