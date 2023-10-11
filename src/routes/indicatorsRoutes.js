const tokenController = require('../controllers/TokenController');
const indicatorsController = require('../controllers/IndicatorsController');
const express = require('express');
const router = express.Router();

router.post('/add', tokenController.tokenVerificationMiddleware, indicatorsController.addIndicator);

router.get('/', tokenController.tokenVerificationMiddleware, indicatorsController.getIndicator);

module.exports = router;