const tasksCollection = require("../db").db().collection("Tasks")
const mongodb = require("mongodb")
const sanitizeHTML = require("sanitize-html")

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
  if (this.task == "") {this.errors.push("You must provide a task.")}
  if (this.task.length > 100) {this.errors.push("Task cannot exceed 100 characters.")}
}

Task.prototype.createNewTask = function(username) {
  return new Promise(async (resolve, reject) => {
    this.cleanup()
    this.validate()
    
    if (!this.errors.length) {
      let safeText = sanitizeHTML(this.task, {allowedTags: [], allowedAttributes: {}})
      try {
        let item = await tasksCollection.insertOne({task: safeText, author: username})
        resolve(item)
      } catch {
        reject()
      }
    } else {
      reject(this.errors)
    }
  })
}

Task.prototype.findTask = function(username) {
  return new Promise(function(resolve, reject) {
    try {
      tasksCollection.find({author: username}).toArray(function(err, tasks) {
        resolve(tasks)
      })
    } catch {
      reject()
    }
  })
}

Task.prototype.delete = function(id) {
  return new Promise(async function(resolve, reject) {
    try {
      await tasksCollection.deleteOne({"_id": mongodb.ObjectId(id)})
      resolve()
    } catch {
        reject()
    }
  })
}

Task.prototype.getTask = function(id) {
  return new Promise(async function(resolve, reject) {
    try {
      let task = await tasksCollection.findOne({"_id": mongodb.ObjectId(id)})
      resolve(task)
    } catch {
      reject()
    }
  })
}

Task.prototype.updateTask = function(id) {
  return new Promise(async (resolve, request) => {
    this.cleanup()
    this.validate()

    if (!this.errors.length) {
      let safeText = sanitizeHTML(this.task, {allowedTags: [], allowedAttributes: {}})
      try {
        await tasksCollection.findOneAndUpdate({"_id": mongodb.ObjectId(id)}, {$set: {"task": safeText}})
        resolve(safeText)
      } catch {
        reject()
      }
    } else {
      reject()
    }
  })
}

module.exports = Task;
