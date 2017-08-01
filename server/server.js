const path = require ('path');
const express = require ('express');
//const hbs = require('hbs');
//const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


const publicPath = path.join(__dirname, '../public')
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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});


console.log(__dirname + '/../public');


console.log(publicPath);
