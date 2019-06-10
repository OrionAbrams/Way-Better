const axios = require("axios");
const router = require("express").Router();
const db = require("../models")
const sdkClient = require("../sdk/sdk")
require("dotenv").config();
var keys = require("../keys")
var apiKey = keys.geolocation.key
var city = 'fairfield'
var state = 'ia'
let currFare = 0

function getTime() {
  var rightNow = Date.now()
  rightNow = rightNow.toString()
  var newStr = rightNow.substring(0, rightNow.length - 3)
  return newStr
}
db.User.create({'username' : 'Jesse'})
// api name which is to be called
var resource = "planets/tropical";

function ubercalc(distance) {
  let dist = parseFloat(distance)
  let base = 2.20
  return base * 2 + (dist * 0.91) + (dist * 2 * 0.39)
}

// make some dummy data in order to call vedic rishi api
var data = {
  'location': '',
  'destination': ''
};

// hardcoded here, but need front end input, then need to change spaces to +'s
// let origin = '30 alvarado pl berkeley ca'
// let destination = "150 golden gate ave san francisco ca"
// origin = origin.trim()
// origin = origin.replace(/\s+/g,'+')
// destination = destination.trim()
// destination = destination.replace(/\s+/g,'+')
// console.log(origin)
// axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&mode=transit&key=' + apiKey).then(function (res) {
//   // console.log(res.data.routes[0].legs[0].distance.text)
//   // put this through function to calc uber fare
//   // subtract transit fare (avg $4) from uber fare
//   // add this current fare to database's total fare
//   // check totalSavings and if over 100, they go up one level
// })
router.post("/astrology", (req, res) => {
  data.location = req.body.location
  data.destination = req.body.destination
  console.log(data)
  let origin = data.location
  let destination = data.destination
  origin = origin.trim()
  origin = origin.replace(/\s+/g, '+')
  destination = destination.trim()
  destination = destination.replace(/\s+/g, '+')
  console.log(origin)
  axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&mode=transit&key=' + apiKey).then(function (res) {
    console.log(res.data.routes[0].legs[0].distance.text)
    let dist = res.data.routes[0].legs[0].distance.text
    // put this through function to calc uber fare
    let uberFare = ubercalc(dist)
    // subtract transit fare (avg $4) from uber fare
    currFare = uberFare - 4
    // add this current fare to database's total fare
    
    // check totalSavings and if over 100, they go up one level
  })
    .then(() => {
      // we want to update the database with money saved and points earned
      console.log(data)
      db.User.update(
        { username: 'Jesse' },
        { $inc: { totalSavings: currFare, totalPoints: 2 } }
      ).then((res) => {
        console.log(res)
      })
    })
})

module.exports = router;