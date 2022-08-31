const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = '9297da810f0263b5321b9268c360917e';


// use css from 'public' folder
app.use(express.static('public'));

// use middleware body-parser
app.use(bodyParser.urlencoded({ extended:true }));

// use ejs
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index', {weather: null, error: null});
});

app.post('/', function(req, res) {
    const city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
    request(url, function(err, response, body) {
        if(err) {
            res.render('index', {weather: null, error: `Error, please try again yeah!`})
        } else {
            const weather = JSON.parse(body);
            if(weather.main == undefined) {
            res.render('index', {
                weather: null, 
                error: `Error, please try again!`});
            } else {
                const weatherText = `Weather in ${weather.name} is ${weather.main.temp} degrees.`;
                res.render('index', {
                    weather: weatherText, 
                    error: null});
            }
        }
    })
});



app.listen(3000, function() {
    console.log("Weather app is running on port 3000")
})