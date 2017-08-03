const moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateGeolocationMessage = (from, latitude, longitude) => {
  console.log(`https://www.google.com/maps?q=${latitude},${longitude}`);
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};
module.exports = {
  generateMessage,
  generateGeolocationMessage
}
