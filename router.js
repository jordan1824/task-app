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
router.get('/', taskController.home);
router.post('/add-task', taskController.addTask)
router.get('/delete/:id', taskController.delete)
router.post('/edit/:id', taskController.edit)
router.get('/edit/:id', taskController.viewEdit)

module.exports = router;
