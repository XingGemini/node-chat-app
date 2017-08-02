var expect = require ('expect');

var {generateMessage} = require('./message');

describe ('generateMessage', () => {
  it ('should generate correct message object', () => {
    var text = 'test test';
    var from = 'user';
    var message = generateMessage(from, text);
    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});
