const express = require('express');
const router = express.Router();
const taigaTasksController = require('../controllers/TaigaTasksController');

router.get('/', taigaTasksController.getUnassignedTasks);

router.get('/', taigaTasksController.getUnassignedTasks);

module.exports = router;