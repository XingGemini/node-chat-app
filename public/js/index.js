var socket = io();
socket.on ('connect', function () {
  console.log('Connected to the server');

  socket.emit('createMessage', {
    to: 'jen@gmail.com',
    text: 'Hey, This is Xing.'
  });
});

socket.on ('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
});
