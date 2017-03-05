const yargs = require('yargs');
const axios = require('axios');
const _ = require('lodash');

const argv = yargs
  .options({
    a:{
      demand: false,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .options({
    d:{
      demand: false,
      alias: 'default',
      describe: 'Get default weather info for Manhattan NY',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodeAddr = encodeURIComponent(argv.address);
if(_.isUndefined(argv.a)){
  encodeAddr = encodeURIComponent('10026');
}
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddr}`;
axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find the address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/<API-KEY>/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
  console.log(response.data);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`Current temperature: ${temperature}`);
  console.log(`Real feel: ${apparentTemperature}`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect to api servers');
  }
  else{
    console.log(e.message);
  }
});
