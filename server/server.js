const path = require ('path');
const http = require('http');
const express = require ('express');
const socketIO = require('socket.io');
//const hbs = require('hbs');
//const fs = require('fs');

const {generateMessage, generateGeolocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users ();

io.on('connect',  (socket) => {
  console.log("new user connected");
  // socket.emit('newMessage',{
  //   from: 'xing',
  //   text: 'Hi how are you',
  //   createdAt: 333
  // });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback ('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser (socket.id, params.name, params.room);
    io.to(params.room).emit ('updateUserList', users.getUserList(params.room));

    socket.emit ('newMessage', generateMessage('Admin', `${params.name}, Welcome to the chat app`));

    socket.broadcast.to(params.room).emit ('newMessage', generateMessage('Admin', `${params.name} is joined.`));

    callback();
  });

  socket.on ('createMessage', (message, callback) => {
    //console.log("create a new message", message);
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)) {
      io.to(user.room).emit ('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on ('createGeolocationMessage', (coords) => {
    //console.log(coords);
    var user = users.getUser(socket.id);
    io.to(user.room).emit('newGeolocationMessage', generateGeolocationMessage(user.name, coords.latitude, coords.longitude));
  });

  socket.on ('disconnect', () => {
    //console.log('User was disconnected');

    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
})

app.use(express.static(publicPath)); //__dirname is the root folder of this script


// hbs.registerPartials(__dirname + '/views/partials');
//
// app.set('view engine', 'hbs');

app.use((req, res, next) => { //next when it's done
  var now = new Date().toString();
  var log = `${now}:\t${req.method}\t${req.url}`;
  console.log (log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
}); // add middleware

// app.use((req, res, next) => {
//   res.render('maintainance.hbs');
// });


// hbs.registerHelper ('getCurrentYear', () => {
//   return new Date().getFullYear();
// });

// hbs.registerHelper ('screamIt', (text) => {
//   return text.toUpperCase();
// })

app.get('/', (req, res)=> {
  //res.send('<h1>Hello Express</h1>');
  res.render('index.html', {
      pageTitle: 'Xing\'s Home Page',
      welcomeMessage: 'Hello Xing'
  });
});

// app.get('/about', (req, res)=> {
//   res.render('about.hbs', {
//     pageTitle: 'Xing\'s About Page',
//   });
// });
//
// app.get('/project', (req, res)=> {
//   res.render('project.hbs', {
//     pageTitle: 'Xing\'s Project Porfolio Page',
//   });
// });

app.get('/bad', (req, res)=> {
  res.send({
      errorMessage: 'Error: Unable to handle request.'
  });
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});


console.log(__dirname + '/../public');


console.log(publicPath);
