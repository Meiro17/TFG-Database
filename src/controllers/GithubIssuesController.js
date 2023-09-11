const githubIssuesModel = require('../models/GithubIssuesModel');

class GithubIssuesController {

    async addGithubIssue(req, res) {
        const { issue, user, assignee } = req.body;
        try {
            await githubIssuesModel.addGithubIssue(issue, user, assignee);
            res.json({ message: 'Github Issue added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                // Duplicate key error
                res.status(400).json({ message: 'Github Issue already exists' });
            } else {
                // Other unexpected error
                res.status(500).json({ message: 'Error adding Github Issue' });
            }
        }
    }

}

module.exports = new GithubIssuesController();