// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//
app.get("/api/", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:timestamp", (req, res) => {
  let timestamp = req.params.timestamp;
  let date = new Date(timestamp);

  if (Number(timestamp)) {
    return res.json({
      unix: Number(timestamp),
      utc: new Date(Number(timestamp)).toUTCString(),
    });
  }

  if (date == "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.valueOf(),
    utc: date.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + 3000);
});
