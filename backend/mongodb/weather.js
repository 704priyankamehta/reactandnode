const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var addweather = new Schema({
  temp: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

var weather = mongoose.model("weathers", addweather);

module.exports = weather;
