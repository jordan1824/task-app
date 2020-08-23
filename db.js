const mongodb = require("mongodb")

let connectionString = 'mongodb+srv://TaskAppUsername:TaskAppPassword123@cluster0.dsmzt.mongodb.net/TaskApp?retryWrites=true&w=majority'

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  module.exports = client
  const app = require("./app")
  app.listen(3000)
})