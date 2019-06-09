const axios = require("axios");
const router = require("express").Router();
const db = require("../models")
const sdkClient = require("../sdk/sdk")
require("dotenv").config();
var keys = require("../keys")
var apiKey = keys.geolocation.key
var city = 'fairfield'
var state = 'ia'
function getTime() {
  var rightNow = Date.now()
  rightNow = rightNow.toString()
  var newStr = rightNow.substring(0, rightNow.length - 3)
  return newStr
}

// api name which is to be called
var resource = "planets/tropical";

// make some dummy data in order to call vedic rishi api
var data = {
  'username': 'joe',
  'day': 1,
  'month': 2,
  'year': 1983,
  'hour': 3,
  'minute': 20,
  'latitude': 41.0076113999999911,
  'longitude': 91.9637691411111,
  'timezone': ''
};

 // hardcoded here, but need front end input, then need to change spaces to +'s
let origin = '30 alvarado pl berkeley ca'
let destination = "150 golden gate ave san francisco ca"
origin = origin.trim()
origin = origin.replace(/\s+/g,'+')
destination = destination.trim()
destination = destination.replace(/\s+/g,'+')
console.log(origin)
axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&mode=transit&key=' + apiKey).then(function (res) {
  // console.log(res.data.routes[0].legs[0].distance.text)
  // put this through function to calc uber fare
  // subtract transit fare (avg $4) from uber fare
  // add this current fare to database's total fare
  // check totalSavings and if over 100, they go up one level
})
router.post("/astrology", (req, res) => {
  city = req.body.city
  state = req.body.state
  data.username = req.body.username
  data.day = req.body.day
  data.month = req.body.month
  data.year = req.body.year
  data.hour = req.body.hour
  data.minute = req.body.minute
  console.log(data)
  axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=30+Alvarado+pl+berkeley+CA&destination=san+francisco&key=' + apiKey).then(function (res) {
    console.log(res)
    // data.latitude = res.data.results[0].geometry.location.lat
    // data.longitude = res.data.results[0].geometry.location.lng
  })
    .then(() => {
      // get the timezone for lat and lng
      axios.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + data.latitude + ',' + data.longitude + '&timestamp=' + getTime() + '&key=' + apiKey)
        .then(function (res) {
          var timezoneData = res.data.rawOffset / 3600
          data.timezone = timezoneData
        })
        .then(() => {
          console.log(data)
          db.User.create(data).then(() => {

            // call horoscope apis
            sdkClient.call(resource, data.day, data.month, data.year, data.hour, data.minute, data.latitude, data.longitude, data.timezone, function (error, result) {

              if (error) {
                console.log("Error returned!!");
              }
              else {
                console.log('Response has arrived from API server --');
                console.log(result);
                res.send(result)
                const jsonString = result
                const object = JSON.parse(jsonString)
                console.dir(object, { depth: null, colors: true })
              }
            });
          })
        })
    })
})

module.exports = router;