const express = require('express');
const router = express.Router();
const dataController = require('../controllers/DataController');
const taskController = require('../controllers/TaskController');

//Users
router.get('/users', dataController.getUsers);
// router.post('/add-user', dataController.addUser);

//Tasks
router.get('/tasks/unassigned', taskController.getUnassignedTasks);

module.exports = router;
