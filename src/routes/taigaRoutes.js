const tokenController = require('../controllers/TokenController');
const taigaController = require('../controllers/TaigaController');
const express = require('express');
const router = express.Router();

/*Task*/
router.post('/tasks/add', tokenController.tokenVerificationMiddleware, taigaController.addTask);

router.put('/tasks/update', tokenController.tokenVerificationMiddleware, taigaController.updateTask);

router.delete('/tasks/delete', tokenController.tokenVerificationMiddleware, taigaController.deleteTask);

router.get('/tasks/unassigned', tokenController.tokenVerificationMiddleware, taigaController.getUnassignedTasks);

router.get('/tasks/assigned', tokenController.tokenVerificationMiddleware, taigaController.getAssignedTasks);

router.get('/tasks/assigned/user', tokenController.tokenVerificationMiddleware, taigaController.getAssignedUserTasks);

router.get('/tasks/EE', tokenController.tokenVerificationMiddleware, taigaController.getEstimatedEffortTasks);

router.get('/tasks/AEC', tokenController.tokenVerificationMiddleware, taigaController.getActualEffortClosedTasks);

router.get('/tasks/closed/user', tokenController.tokenVerificationMiddleware, taigaController.getClosedUserTasks);

router.get('/tasks/HD', tokenController.tokenVerificationMiddleware, taigaController.getHighDeviatedTasks);

/*UserStory*/
router.post('/userstories/add', tokenController.tokenVerificationMiddleware, taigaController.addUserStory);

router.put('/userstories/update', tokenController.tokenVerificationMiddleware, taigaController.updateUserStory);

router.delete('/userstories/delete', tokenController.tokenVerificationMiddleware, taigaController.deleteUserStory);

router.get('/userstories/pattern', tokenController.tokenVerificationMiddleware, taigaController.getPatternUserStories);

router.get('/userstories/AC', tokenController.tokenVerificationMiddleware, taigaController.getACUsertories);

/*Epic*/
router.post('/epics/add', tokenController.tokenVerificationMiddleware, taigaController.addEpic);

router.put('/epics/update', tokenController.tokenVerificationMiddleware, taigaController.updateEpic);

router.delete('/epics/delete', tokenController.tokenVerificationMiddleware, taigaController.deleteEpic);

/*Issue*/
router.post('/issues/add', tokenController.tokenVerificationMiddleware, taigaController.addIssue);

router.put('/issues/update', tokenController.tokenVerificationMiddleware, taigaController.updateIssue);

router.delete('/issues/delete', tokenController.tokenVerificationMiddleware, taigaController.deleteIssue);

module.exports = router;