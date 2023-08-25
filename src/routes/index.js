const express = require('express');
const router = express.Router();
const dataController = require('../controllers/DataController');

router.get('/users', dataController.getUsers);
// router.post('/add-user', dataController.addUser);

module.exports = router;
