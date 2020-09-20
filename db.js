const mongodb = require("mongodb")
const app = require("./app")

let port = process.env.PORT
if (port == null || port == "") {
  port = 3000
}

mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  module.exports = client
  app.listen(port)
})