const User = require("../models/User")

exports.viewLogin = function(req, res) {
  res.render("login")
}

exports.viewRegister = function(req, res) {
  res.render('register')
}

exports.register = function(req, res) {
  let user = new User(req.body)
  res.send("New user created")
}