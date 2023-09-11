const githubModel = require('../models/GithubModel');
const mainProjectModel = require('../models/MainProjectModel');

class GithubController {

    async addIssue(req, res) {
        const { main_project, issue, user, assignee } = req.body;
        try {
            const project = await mainProjectModel.getMainProject(main_project.project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }
            
            await githubModel.addIssue(main_project, issue, user, assignee);
            return res.status(200).json({ message: 'Github Issue added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Github Issue already exists' });
            } else {
                return res.status(500).json({ message: 'Error adding Github Issue', arguments: error.message });
            }
        }
    }

    async addCommit(req, res) {
        const { main_project, commit, user } = req.body;
        try {
            const project = await mainProjectModel.getMainProject(main_project.project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }
                
            await githubModel.addCommit(main_project, commit, user);
            return res.status(200).json({ message: 'Github Commit added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Github Commit already exists' });
            } else {
                return res.status(500).json({ message: 'Error adding Github Commit', arguments: error.message });
            }
        }
    }

}

module.exports = new GithubController();