const request = require('request')
const config = require('../config/appconfig.json');

var getWeather = (lat, lng, callback) => {
  request({
      url:`${config.darksky}${lat},${lng}`,
      json: true
  },(error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
    else {
      console.log('Unable to fetch weather');
    }
  });
};

module.exports = {
  getWeather
};
