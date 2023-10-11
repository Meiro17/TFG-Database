const tokenController = require('../controllers/TokenController');
const mainProjectController = require('../controllers/MainProjectController');
const express = require('express');
const router = express.Router();

router.post('/add', tokenController.tokenVerificationMiddleware, mainProjectController.addMainProject);

router.get('/get', tokenController.tokenVerificationMiddleware, mainProjectController.getMainProject);

module.exports = router;