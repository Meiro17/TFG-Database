const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/TokenController');

router.get('/get', tokenController.getToken);

module.exports = router;