const tokenController = require('../controllers/TokenController');
const factorsController = require('../controllers/FactorsController');
const express = require('express');
const router = express.Router();

router.post('/add', tokenController.tokenVerificationMiddleware, factorsController.addFactor);

router.put('/update', tokenController.tokenVerificationMiddleware, factorsController.updateFactor);

router.get('/', tokenController.tokenVerificationMiddleware, factorsController.getFactor);

module.exports = router;