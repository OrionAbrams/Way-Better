var sdkClient = require('./sdk');

// make some dummy data in order to call vedic rishi api
var data = {
    'date': 1,
    'month': 2,
    'year': 1983,
    'hour': 3,
    'minute': 20,
    'latitude': 41.0031,
    // 'latitude' : 41.0076,
    'longitude': 91.5745,
    // 'longitude': 91.9637,
    'timezone': 6
};

// api name which is to be called
var resource = "planets/tropical";
// var resource = "western_horoscope"

// call horoscope apis
sdkClient.call(resource, data.date, data.month, data.year, data.hour, data.minute, data.latitude, data.longitude, data.timezone, function(error, result){

    if(error)
    {
        console.log("Error returned!!");
    }
    else
    {
        console.log('Response has arrived from API server --');
        console.log(result);
        const jsonString = result
const object = JSON.parse(jsonString)

console.dir(object, {depth: null, colors: true})
    }
});