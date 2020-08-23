const usersCollection = require("../db").db().collection("users")
const validator = require("validator")

let User = function(data) {
  if (data) {
    this.username = data.username
    this.password = data.password
    this.email = data.email
  }
  this.errors = []
}

User.prototype.cleanup = function() {
  if (typeof(this.username) != "string") {
    this.username = "";
  }
  if (typeof(this.password) != "string") {
    this.password = "";
  }
  if (typeof(this.email) != "string") {
    this.email = "";
  }

  this.username = this.username.trim().toLowerCase()
  this.email = this.email.trim().toLowerCase()
}

User.prototype.validate = async function() {
  if (this.username == "") {this.errors.push("You must enter a valid username.")}
  if (this.password == "") {this.errors.push("You must enter a valid password.")}
  if (!validator.isEmail(this.email)) {this.errors.push("You must enter a valid email address.")}
  if (this.username.length > 0 && !validator.isAlphanumeric(this.username)) {this.errors.push("Your username cannot contain special characters.")}
  if (this.password.length > 0 && this.password.length < 8) {this.errors.push("Your password must be atleast 8 characters long.")}
  if (this.password.length > 50) {this.errors.push("Your password cannot exceed 50 characters.")}
  if (this.username.length > 50) {this.errors.push("Your username cannot exceed 50 characters.")}
  if (this.username.length > 0 && this.username.length < 4) {this.errors.push("Your username must be atleast 4 characters long.")}
  if (this.email.length > 200) {this.errors.push("Your email cannot exceed 200 characters.")}

  if (!this.errors.length) {
    let result = await usersCollection.findOne({username: this.username})
    if (result) {this.errors.push("That username is already taken.")}
  }
  if (!this.errors.length) {
    let result = await usersCollection.findOne({email: this.email})
    if (result) {this.errors.push("That email address is already connected to an account.")}
  }
}

User.prototype.createNewUser = function() {
  return new Promise(async (resolve, reject) => {
    await this.cleanup()
    await this.validate()

    if (!this.errors.length) {
      usersCollection.insertOne({username: this.username, email: this.email, password: this.password}, function() {
        resolve()
      })
    } else {
      reject(this.errors)
    }
  })
}

User.prototype.checkUserDetails = function(username, password) {
  return new Promise(async (resolve, reject) => {
    let result = await usersCollection.findOne({username: username.toLowerCase(), password: password})
    if (result) {
      resolve()
    } else {
      reject()
    }
  })
}

module.exports = User