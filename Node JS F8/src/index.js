const express = require('express');
const app = express();
const port = 8080;
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

const route = require('./routes');

const db = require('./config/db');
//connect db
db.connect();

///override method (PUT)
app.use(methodOverride('_method'));

//stattic file
app.use(express.static(path.join(__dirname, 'public')));

//post lên requestBody parse sang json
app.use(express.json())
//post midleware
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

//template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
  }),
);

//view engine express-handlebars
app.set('view engine', 'hbs');
//config directory for view
app.set('views', path.join(__dirname, 'resource', 'views'));
// console.log(__dirname);

//http logger
// app.use(morgan('combined'))

//routes init
route(app);

app.listen(port, () =>
  console.log(`App listening at https://localhost:${port}`),
);
