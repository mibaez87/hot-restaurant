var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservations = [];
var waitlist = [];

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function (req, res) {
  res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
  res.json(waitlist);
});

app.post("/api/new", function (req, res) {
  var newreservation = req.body;

  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
  console.log(reservations.length);

  if (reservations.length > 2) {
    waitlist.push(newreservation);
    console.log("WAITLIST");
  } else {
    reservations.push(newreservation);
    console.log("RESERVATIONS");
  }
  res.json(newreservation);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});