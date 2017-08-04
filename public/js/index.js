
var socket = io();
socket.on ('connect', function () {
  console.log('Connected to the server');

  // socket.emit('createMessage', {
  //   to: 'jen@gmail.com',
  //   text: 'Hey, This is Xing.'
  // });
});

socket.on ('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  //
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery ('#messages').append(li);

  var template = jQuery('#message-template').html();

  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html)
});

socket.on('newGeolocationMessage', function(message) {
  console.log('New geolocation message', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');


  var template = jQuery('#geolocationMessage-template').html();

  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  // var template = jQuery('#message-template').html();
  //
  // var html = Mustache.render(template, {
  //   text: message.text,
  //   url: message.url,
  //   createdAt: formattedTime
  // });
  //
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  //
  // jQuery ('#messages').append(li);
});

jQuery('#message-form').on ('submit',function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage',  {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert ('Genolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function (position) {
    //console.log(position);
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit ('createGeolocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (e) {
    //console.log(`ERROR(${e.code}): ${e.message}`);
    alert ('Unable to fetch location, a default cooridinates is used' + e);
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit ('createGeolocationMessage', {
      latitude: '37.432302',
      longitude: '-122.18713960000001'
    });
  });
});
