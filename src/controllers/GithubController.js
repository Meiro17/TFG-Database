const githubModel = require('../models/GithubModel');
const mainProjectModel = require('../models/MainProjectModel');

class GithubController {

    async addGithubIssue(req, res) {
        const { main_project, issue, user, assignee } = req.body;
        try {
            const project = await mainProjectModel.getMainProject(main_project.project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const issue_exists = await githubModel.getIssue(main_project.project_name, issue.id);
            if (issue_exists.length) {
                res.status(400).json({ message: 'Github Issue already exists' });
            }

            await githubModel.addIssue(main_project, issue, user, assignee);
            res.json({ message: 'Github Issue added correctly' });
        } catch (error) {
            if (error) {
                // Other unexpected error
                res.status(500).json({ message: 'Error adding Github Issue', arguments: error.message });
            }
        }
    }

    async addGithubCommit(req, res) {
        const { main_project, commit, user } = req.body;
        try {
            const project = await mainProjectModel.getMainProject(main_project.project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const commit_exists = await githubModel.getCommit(main_project.project_name, commit.sha);
            if (commit_exists.length) {
                res.status(400).json({ message: 'Github Commit already exists' });
            }

            await githubModel.addCommit(main_project, commit, user);
            res.json({ message: 'Github Commit added correctly' });
        } catch (error) {
            if (error) {
                // Other unexpected error
                res.status(500).json({ message: 'Error adding Github Commit', arguments: error.message });
            }
        }
    }

}

module.exports = new GithubController();