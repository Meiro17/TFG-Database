const express = require('express');
const router = express.Router();
const githubIssuesController = require('../controllers/GithubIssuesController');

router.post('/add', githubIssuesController.addGithubIssue);

module.exports = router;