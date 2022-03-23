var express = require("express");
var router = express.Router();
const weather = require("../controller/weather");
var data = require("../controller/data.js");
const { route } = require("./users.js");
function validation(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) {
    return res.send("required email or password");
  }
  next();
}
function validatingEmail(req, res, next) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(req.email);
  if (re.test(req.body.email)) {
    next();
  } else {
    return res.send("invalid email");
  }
}

/* GET home page. */
router.post("/loginUser", validation, data.loginUser);
router.post("/loginAdmin", validation, data.loginAdmin);
router.post("/registrationUser", validatingEmail, data.registerUser);
router.post("/registrationAdmin", validatingEmail, data.registerAdmin);
router.post("/addweather", data.checkSession, weather.AddWeather);
router.post("/displayweather", data.checkSession, weather.Display);
router.put("/update", data.checkSession, weather.updateweather);
module.exports = router;
