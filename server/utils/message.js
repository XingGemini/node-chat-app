var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var generateGeolocationMessage = (from, latitude, longitude) => {
  console.log(`https://www.google.com/maps?q=${latitude},${longitude}`);
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  };
};
module.exports = {
  generateMessage,
  generateGeolocationMessage
}
