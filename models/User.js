const app = require("../app")

let User = function(data) {
  this.data = data
  this.errors = []
}


module.exports = User