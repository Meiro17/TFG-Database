const express = require('express');
const router = express.Router();
const githubController = require('../controllers/GithubController');

router.post('/issues/add', githubController.addIssue);

router.post('/commits/add', githubController.addCommit);

router.get('/commits/modlines', githubController.getModifiedLines);

router.get('/commits/taskref', githubController.getCommitsTaskRef);

router.get('/commits', githubController.getCommits);

router.get('/commits/user', githubController.getCommitsUser);

module.exports = router;