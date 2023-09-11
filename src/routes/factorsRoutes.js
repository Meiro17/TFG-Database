const express = require('express');
const router = express.Router();
const factorsController = require('../controllers/FactorsController');

router.post('/add', factorsController.addFactor);

router.put('/update', factorsController.updateFactor);

router.get('/', factorsController.getFactor);

module.exports = router;