const User = require("../models/User")

exports.passwordProtected = function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

exports.login = function(req, res) {
  new User().checkUserDetails(req.body.username, req.body.password).then(function() {
    req.session.user = {username: req.body.username}
    req.session.save(function() {
      res.redirect('/')
    })
  }).catch(function() {
    req.flash("errors", "Invalid username and/or password.")
    req.session.save(function() {
      res.redirect('/login')
    })
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
    req.session.user = {username: req.body.username}
    req.session.save(function() {
      res.redirect('/')
    })
  }).catch(function(errors) {
    errors.forEach(error => {
      req.flash("errors", error)
    })
    req.session.save(function() {
      res.redirect('/register')
    })
  })
}