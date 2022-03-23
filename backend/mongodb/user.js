const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var registerUser = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

var user = mongoose.model("users", registerUser);

module.exports = user;
