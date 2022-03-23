const registration = require("../mongodb/user");
const { count } = require("console");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
var registrations = require("../mongodb/admin");

function checkSession(req, res, next) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(": ")[1];
      console.log(token);
      var decode = jwt.verify(token, "shhhhh");

      req.user = {
        id: decode._doc._id,
      };
      next();
    } else {
      res.send("invalid token");
    }
  } catch (err) {
    res.send("invalid token");
  }
}
async function loginAdmin(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  const user = await registrations.findOne({ email: email });
  if (user === null) {
    return res.send("no user found");
  }
  console.log(user);
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      res.send("incmplete data");
    }

    if (result == false) {
      return res.send("invalid email or id");
    } else {
      var token = jwt.sign({ ...user, _id: user._id.toString() }, "shhhhh", {
        expiresIn: "1h",
      });

      return res.send(token);
    }
  });
}

async function loginUser(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  const user = await registration.findOne({ email: email });
  if (!user) {
    res.send("no user found");
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      res.send("incmplete data");
    }
    if (result == false) {
      return res.send("invalid email or id");
    } else {
      var token = jwt.sign({ ...user, _id: user._id.toString() }, "shhhhh", {
        expiresIn: "1h",
      });
      res.send(token);
    }
  });
}
const registerUser = async function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.send("data is not valid");
    }
    var newUser = new registration({
      name: name,
      email: email,
      password: hash,
    });

    newUser
      .save()
      .then((doc) => res.send("registrered"))
      .catch((err) => res.send("user already exists"));
  });
};
const registerAdmin = async function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.send("data is not valid");
    }

    var newUser = new registrations({
      name: name,
      email: email,
      password: hash,
    });
    newUser
      .save()
      .then((doc) => {
        res.send("registered");
        console.log(doc);
      })
      .catch((err) => res.send("user already exists"));
  });
};

module.exports = {
  registerUser,
  checkSession,
  registerAdmin,
  loginUser,
  loginAdmin,
};
