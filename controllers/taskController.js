const Task = require('../models/Task');

exports.home = function (req, res) {
  new Task().findTask(req.session.user.username).then(function(tasks) {
    res.render('index', {tasks: tasks});
  }).catch(function() {
    req.flash("errors", "Error loading current tasks. Please try again later.")
    req.session.save(function() {
      res.send("Error loading current tasks. Please try again later.")
    })
  })
};

exports.addTask = function(req, res) {
  let task = new Task(req.body.task)
  task.createNewTask(req.session.user.username).then(function(response) {
    if (req.body.sent == "async") {
      res.send(response.ops[0])
    } else {
      res.redirect('/')
    }
  }).catch(function(errors) {
    errors.forEach(error => {
      req.flash("errors", error)
    })
    req.session.save(function() {
      res.send(errors)
    })
  })
}

exports.delete = function(req, res) {
  new Task().delete(req.params.id).then(function() {
    res.redirect('/')
  }).catch(function() {
    req.flash("errors", "Please try again later.")
    req.session.save(function() {
      req.send("Please try again later.")
    })
  })
}

exports.viewEdit = function(req, res) {
new Task().getTask(req.params.id).then(function(task) {
  res.render("edit", {task: task})
}).catch(function() {
    req.flash("errors", "Please try again later.")
    req.session.save(function() {
      req.send("Please try again later.")
    })
})
}

exports.edit = async function(req, res) {
  new Task().updateTask(req.params.id, req.body.task).then(function() {
    res.redirect('/')
  }).catch(function() {
    req.flash("errors", "Please try again later.")
    req.session.save(function() {
      req.send("Please try again later.")
    })
  })
}