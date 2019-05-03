const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
var dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs')
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let apiKey =process.env.KEY;
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err, response, body) {
   if(err){
     res.render('index', {weather: null, error: 'Error, please try again'});
  } else {
    let weather = JSON.parse(body)
    if(weather.main == undefined){
      res.render('index', {weather: null, error: 'Error, please try again'});
     } else {
       let weatherName = `${weather.name}`   
       let weatherDescription = `${weather.weather[0].description}`  
       let weatherTemp = `Temperature: ${weather.main.temp}°C`
       let weatherId = `${weather.weather[0].id}`
       let weatherIcon = `${weather.weather[0].icon}` 
       let weatherHumidity = `Humidity: ${weather.main.humidity}%` 
       let weatherWind = ` Wind: ${weather.wind.speed}meter/sec`
       res.render('index', {weather: weatherName, weather2: weatherDescription , weather3: weatherTemp , weather4: weatherId , weather5: weatherIcon , weather6: weatherHumidity , weather7: weatherWind , error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('listening on port 3000')
})

