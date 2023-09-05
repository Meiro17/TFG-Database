const express = require('express');
const router = express.Router();
const projectController = require('../controllers/MainProjectController');
const dataController = require('../controllers/DataController');
const taigaTasksController = require('../controllers/TaigaTasksController');
const MainProjectController = require('../controllers/MainProjectController');

//Main Project
router.post('/project/add', MainProjectController.addMainProject);

router.get('/project/get', MainProjectController.getMainProject);

//Users
// router.get('/users', dataController.getUsers);
// router.post('/add-user', dataController.addUser);

//Tasks
// router.get('/tasks/unassigned', taigaTasksController.getUnassignedTasks);

module.exports = router;
