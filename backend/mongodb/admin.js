const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var registerAdmin = new Schema({
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

var admin = mongoose.model("admins", registerAdmin);

module.exports = admin;
