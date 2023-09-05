const express = require('express');
const router = express.Router();
const mainProjectController = require('../controllers/MainProjectController');

router.post('/add', mainProjectController.addMainProject);
router.get('/get', mainProjectController.getMainProject);

module.exports = router;