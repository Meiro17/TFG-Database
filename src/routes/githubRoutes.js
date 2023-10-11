const tokenController = require('../controllers/TokenController');
const githubController = require('../controllers/GithubController');
const express = require('express');
const router = express.Router();

router.post('/issues/add', tokenController.tokenVerificationMiddleware, githubController.addIssue);

router.post('/commits/add', tokenController.tokenVerificationMiddleware, githubController.addCommit);

router.get('/commits/modlines', tokenController.tokenVerificationMiddleware, githubController.getModifiedLines);

router.get('/commits/taskref', tokenController.tokenVerificationMiddleware, githubController.getCommitsTaskRef);

router.get('/commits', tokenController.tokenVerificationMiddleware, githubController.getCommits);

router.get('/commits/user', tokenController.tokenVerificationMiddleware, githubController.getCommitsUser);

module.exports = router;