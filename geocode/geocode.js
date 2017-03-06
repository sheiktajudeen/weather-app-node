const request = require('request');
const config = require('../config/appconfig.json');

var geocodeAddress = (address, callback) => {
  var encodeAddr = encodeURIComponent(address);
  request({
    url:`${config.googleapismap}${encodeAddr}`,
    json: true
  },(error, response, body) => {
    if(error){
      callback('Unable to connect to Google servers.');
    }else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    }else if (body.status === 'OK') {
      callback(undefined,{
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
}
