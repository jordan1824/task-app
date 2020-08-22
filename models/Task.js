const app = require("../app")
const mongodb = require("mongodb")

let Task = function (task) {
  this.task = task
  this.errors = []
};

Task.prototype.cleanup = function() {
  if (typeof(this.task) != "string") {
    this.task = ""
  }
}

Task.prototype.validate = function() {
  if (this.task == "") {this.errors.push("You must provide a task")}
}

Task.prototype.createNewTask = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanup()
    this.validate()
    
    if (!this.errors.length) {
      let item = await app.tasksCollection.insertOne({task: this.task})
      resolve(item)
    } else {
      reject(this.errors)
    }
  })
}

Task.prototype.findTask = function() {
  return new Promise(function(resolve, reject) {
    app.tasksCollection.find().toArray(function(err, tasks) {
      resolve(tasks)
    })
  })
}

Task.prototype.delete = function(id) {
  return new Promise(async function(resolve, reject) {
    await app.tasksCollection.deleteOne({"_id": mongodb.ObjectId(id)}, function() {
      resolve()
    })
  })
}

Task.prototype.getTask = function(id) {
  return new Promise(async function(resolve, reject) {
    let task = await app.tasksCollection.findOne({"_id": mongodb.ObjectId(id)})
    resolve(task)
  })
}

Task.prototype.updateTask = function(id, newTask) {
  return new Promise(async (resolve, request) => {
    await app.tasksCollection.findOneAndUpdate({"_id": mongodb.ObjectId(id)}, {$set: {"task": newTask}}, function() {
      resolve()
    })
  })
}

module.exports = Task;
