const express = require('express');
const router = express.Router();
const githubController = require('../controllers/GithubController');

router.post('/issues/add', githubController.addIssue);

router.post('/commits/add', githubController.addCommit);

module.exports = router;