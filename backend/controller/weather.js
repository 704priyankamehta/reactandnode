const weather = require("../mongodb/weather");

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("/");
}

async function AddWeather(req, res) {
  var { date, time, temp } = req.body;
  if (!date) {
    today = new Date();
    var date = formatDate(today);
    console.log(typeof date);
  }
  console.log(time);
  if (!time) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
  }
  today = new Date(time);
  var times = today.getHours() + ":" + today.getMinutes();
  var newUser = new weather({
    temp: temp,
    date: date,
    time: times,
  });
  var response = await weather.findOne({
    $and: [{ date: date }, { time: times }],
  });
  if (response) {
    return res.send("temperature added for this date and time");
  }
  newUser
    .save()
    .then((doc) => res.send("temperature added"))
    .catch((err) => {
      res.send("temperature already added");
      console.log(err);
    });
}
async function Display(req, res) {
  var { value, time, temp } = req.body;
  date = formatDate(value);
  today = new Date(time);
  var times = today.getHours() + ":" + today.getMinutes();
  console.log(times);

  //if (Object.keys(startdate).length == 0) {
  //res.send(404, "date not mention");
  //}
  console.log(req.body);
  const getWeather = await weather.find({ date: date });
  console.log(getWeather.length);
  console.log(typeof getWeather);
  if (getWeather.length === 0) {
    return res.send("temperature not added");
  }
  console.log("hello");
  getWeather.sort(({ time: a }, { time: b }) => (a > b ? 1 : a < b ? -1 : 0));
  console.log("sorted" + getWeather);
  return res.send(getWeather);
}
async function updateweather(req, res, next) {
  const { temp, time, date } = req.body;

  var response = await weather.findOneAndUpdate(date, { temp, time });
  if (!response) {
    res.send("no data for the specific date");
  } else {
    res.send("updated");
  }
}

module.exports = {
  AddWeather,
  Display,
  updateweather,
};
