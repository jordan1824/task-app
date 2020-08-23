const User = require("../models/User")

exports.login = function(req, res) {
  new User().checkUserDetails(req.body.username, req.body.password).then(function() {
    req.session.user = {username: req.body.username}
    res.send("Woo-hoo! Login Was Successful!")
  }).catch(function() {
    res.send("Invalid login details")
  })
}

exports.logout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login')
  })
}

exports.viewLogin = function(req, res) {
  res.render("login")
}

exports.viewRegister = function(req, res) {
  res.render('register')
}

exports.register = function(req, res) {
  let user = new User(req.body)
  user.createNewUser().then(function() {
    res.send("User was created successfully")
  }).catch(function(errors) {
    res.render("404", {errors: errors})
  })
}