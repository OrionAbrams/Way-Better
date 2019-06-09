console.log('this is loaded');

exports.astrology = {
  userID: process.env.ASTROLOGY_USER_ID,
  apiKey: process.env.ASTROLOGY_API
};

exports.geolocation = {
  key: process.env.GOOGLE_MAPS_API
}