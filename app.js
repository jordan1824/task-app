const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const dotenv = require("dotenv")
dotenv.config()

const app = express();

let sessionOptions = session({
  secret: process.env.SECRET,
  store: new MongoStore({client: require('./db')}),
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})
app.use(sessionOptions)
app.use(flash())

app.use(function(req, res, next) {
  res.locals.user = req.session.user
  res.locals.errors = req.flash("errors")
  res.locals.success = req.flash("success")
  next()
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', require('./router'));

module.exports = app