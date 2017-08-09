const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();

// to run on HEROKU
// HEROKU uses command 'npm start' to run application
// DON'T FORGET TO CREATE 'start' task in package.json beore deployment
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

/**
 * The order of the middlewares is important!!!!!
 */
 
// app.set(key, value)
app.set('view engine', 'hbs');

// middleware: the place for static files

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${ now }: ${ req.method } ${ req.url }`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', () => {});
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

// register helper (hrlperName, function)
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    caption: 'Node.js Debugging in VS Code'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    caption: 'About Page'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${ port }`);
});