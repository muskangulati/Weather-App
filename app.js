const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const axios = require('axios');

app.use(bodyparser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0615c7005d73d0e4625968b5a021e069&units=metric";
    axios.get(url)
        .then(response => {
            console.log(response);
            const data = response.data;
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const sunrise = new Date(data.sys.sunrise);
            const sunset = new Date(data.sys.sunset);
            //const icon = data.weather[0].icon;
            //const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<div style='width: auto;height: auto; border: 4px solid orange; margin-top:8rem' border-bottom-style: groove;>");
            res.write("<h1 style='text-align: center; '> City Name :" + city + "</h1>");
            res.write("<h1 style='color: green;margin-top:0.5 rem;text-align: center; font-family: monospace;''> Temperature: " + temp + "</h1>");
            res.write("<h2 style='color: green;margin-top:0.5 rem;text-align: center; font-family: monospace;'> Weather Condition : " + description + "</h2>");
            res.write("<h2 style='color: green;margin-top:0.5 rem;text-align: center; font-family: monospace;'> Sunrise Time is : " + sunrise + " </h2>");
            res.write("<h2 style='color: green;margin-top:0.5 rem;text-align: center; font-family: monospace;'> Sunset TIme is : " + sunset + "</h2>");
            //res.write("<img style='margin-left:auto; margin-right:auto; display:block;' src=" + imgurl + ">");
            res.write("</div>");
        })
        .catch(error => {
            console.log(error);
        })
})
app.listen(port, (req, res) => {
    console.log("Server started at port", port);
})