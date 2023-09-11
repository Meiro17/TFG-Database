const express = require('express');
const router = express.Router();
const githubController = require('../controllers/GithubController');

router.post('/issues/add', githubController.addGithubIssue);

// router.post('/commits/add', githubController.addGithubCommit);

module.exports = router;