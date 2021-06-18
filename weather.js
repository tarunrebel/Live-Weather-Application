const express = require("express");
const https = require("https");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(4000, function () {
    console.log("the server has started at port 4000");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const api = "ccc27e990d647a4e3a0e30752444c914";
    var cityName = req.body.cityname;
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=" +
        api;
    https.get(url, function (response) {
        response.on("data", function (data) {
            var weatherinfo = JSON.parse(data);
            var weather = weatherinfo.weather[0].main;
            var temperature = weatherinfo.main.temp;
            var place = weatherinfo.name;
            var icon = weatherinfo.weather[0].icon;
            var imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write(
                "<h1>" + "The weather in " + place + " is " + weather + "</h1>"
            );
            res.write(
                "The temperature in " +
                    place +
                    " is " +
                    temperature +
                    " degree Celcius<br>"
            );
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });
});
