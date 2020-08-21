const Task = require('../models/Task');

exports.home = async function (req, res) {
  res.render('index');
};

exports.addTask = function(req, res) {
  console.log(req.body)
  res.send("Success")
}
