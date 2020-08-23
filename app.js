const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(function(req, res, next) {
//     req.local.messages = flash("errors")
//     req.local.messages = flash("success")
//     next()
// })

app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', require('./router'));

module.exports = app