const router = require('express').Router();
const taskController = require('./controllers/taskController');
const userController = require('./controllers/userController');

router.get('/login', userController.viewLogin)
router.get('/', taskController.home);
router.post('/add-task', taskController.addTask)
router.get('/register', userController.viewRegister)
router.post('/register', userController.register)
router.get('/delete/:id', taskController.delete)
router.get('/edit/:id', taskController.viewEdit)
router.post('/edit/:id', taskController.edit)

module.exports = router;
