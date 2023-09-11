const express = require('express');
const router = express.Router();
const indicatorsController = require('../controllers/IndicatorsController');

router.post('/add', indicatorsController.addIndicator);

router.get('/', indicatorsController.getIndicator);

module.exports = router;