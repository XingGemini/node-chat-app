var expect = require ('expect');

var {generateMessage, generateGeolocationMessage} = require('./message');

describe ('generateMessage', () => {
  it ('should generate correct message object', () => {
    var text = 'test test';
    var from = 'user';
    var message = generateMessage(from, text);
    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});


describe ('generateGeolocationMessage', () => {
  it ('should generate correct geolocation message object', () => {
    var from = 'user';
    var latitute = 15;
    var longitude = 19;
    var message = generateGeolocationMessage(from, latitute, longitude);
    var url ='https://www.google.com/maps?q=15,19';
    expect(message).toInclude({from, url});
    expect(message.createdAt).toBeA('number');
  });
});
