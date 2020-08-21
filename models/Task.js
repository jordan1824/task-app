const app = require("../app")


let TaskFunc = function () {

};

TaskFunc.prototype.insert = function() {
  console.log(app.tasksCollection.insertOne({name: "NameTest6"}))
  }

module.exports = TaskFunc;
