const express = require('express');
const router = express.Router();
const taigaController = require('../controllers/TaigaController');

/*Task*/
router.post('/tasks/add', taigaController.addTask);

router.put('/tasks/update', taigaController.updateTask);

router.delete('/tasks/delete', taigaController.deleteTask);

router.get('/tasks/unassigned', taigaController.getUnassignedTasks);

router.get('/tasks/assigned', taigaController.getAssignedTasks);

router.get('/tasks/assigned/user', taigaController.getAssignedUserTasks);

router.get('/tasks/EE', taigaController.getEstimatedEffortTasks);

router.get('/tasks/AEC', taigaController.getActualEffortClosedTasks);

router.get('/tasks/closed/user', taigaController.getClosedUserTasks);

router.get('/tasks/HD', taigaController.getHighDeviatedTasks);

/*UserStory*/
router.post('/userstories/add', taigaController.addUserStory);

router.put('/userstories/update', taigaController.updateUserStory);

router.delete('/userstories/delete', taigaController.deleteUserStory);

router.get('/userstories/pattern', taigaController.getPatternUserStories);

router.get('/userstories/AC', taigaController.getACUsertories);

/*Epic*/
router.post('/epics/add', taigaController.addEpic);

router.put('/epics/update', taigaController.updateEpic);

router.delete('/epics/delete', taigaController.deleteEpic);

/*Issue*/
router.post('/issues/add', taigaController.addIssue);

router.put('/issues/update', taigaController.updateIssue);

router.delete('/issues/delete', taigaController.deleteIssue);

module.exports = router;