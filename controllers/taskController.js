const Task = require('../models/Task');

exports.home = function (req, res) {
  new Task().findTask().then(function(tasks) {
    res.render('index', {tasks: tasks});
  }).catch(function() {
    console.log("There has been an error")
  })
};

exports.addTask = function(req, res) {
  let task = new Task(req.body.task)
  task.createNewTask().then(function(response) {
    res.send(response)
  }).catch(function(errors) {
    res.render("404", {"errors": errors})
  })
}

exports.delete = function(req, res) {
  new Task().delete(req.params.id).then(function() {
    res.redirect('/')
  }).catch(function() {
    console.log("There has been an error")
  })
}

exports.viewEdit = function(req, res) {
new Task().getTask(req.params.id).then(function(task) {
  res.render("edit", {task: task})
}).catch(function() {
  console.log("error")
})
}

exports.edit = async function(req, res) {
  new Task().updateTask(req.params.id, req.body.task).then(function() {
    res.redirect('/')
  }).catch(function() {
    console.log("Error")
  })
}