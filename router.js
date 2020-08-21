const router = require('express').Router();
const taskController = require('./controllers/taskController');

router.get('/', taskController.home);
router.post('/add-task', taskController.addTask)

module.exports = router;
