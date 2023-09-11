const express = require('express');
const router = express.Router();
const taigaController = require('../controllers/TaigaController');

/*Task*/
router.post('/tasks/add', taigaController.addTask);

router.put('/tasks/update', taigaController.updateTask);

router.delete('/tasks/delete', taigaController.deleteTask);

router.get('tasks/unassigned', taigaController.getUnassignedTasks);

/*UserStory*/
router.post('/userstories/add', taigaController.addUserStory);

router.put('/userstories/update', taigaController.updateUserStory);

router.delete('/userstories/delete', taigaController.deleteUserStory);

/*Epic*/
router.post('/epics/add', taigaController.addEpic);

router.put('/epics/update', taigaController.updateEpic);

router.delete('/epics/delete', taigaController.deleteEpic);

/*Issue*/
router.post('/issues/add', taigaController.addIssue);

router.put('/issues/update', taigaController.updateIssue);

router.delete('/issues/delete', taigaController.deleteIssue);

module.exports = router;