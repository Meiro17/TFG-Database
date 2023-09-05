const express = require('express');
const router = express.Router();
const taigaTasksController = require('../controllers/TaigaTasksController');

router.get('/unassigned', taigaTasksController.getUnassignedTasks);

module.exports = router;