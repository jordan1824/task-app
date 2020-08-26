const router = require('express').Router();
const taskController = require('./controllers/taskController');
const userController = require('./controllers/userController');

// User Related Routes
router.get('/login', userController.viewLogin)
router.post('/login', userController.login)
router.get('/register', userController.viewRegister)
router.post('/register', userController.register)
router.get('/logout', userController.logout)

// Task Related Routes
router.get('/', userController.passwordProtected, taskController.home);
router.post('/add-task', taskController.addTask)
router.get('/delete/:id', userController.passwordProtected, taskController.delete)
router.post('/edit/:id', taskController.edit)
router.get('/edit/:id', userController.passwordProtected, taskController.viewEdit)
router.post('/delete-tasks', taskController.deleteAll)

module.exports = router;
