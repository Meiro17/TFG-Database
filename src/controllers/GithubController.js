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

    async getCommits(req, res) {
        const { project_name, repository } = req.query;
        try {
            const project = await mainProjectModel.getMainProject(project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }
                
            const commits = await githubModel.getCommits(project_name, repository);
            return res.status(200).json({ message: 'Commits', data: commits });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error getting commits', error: error.message });
        }
    }

    async getCommitsUser(req, res) {
        const { project_name, repository, login } = req.query;
        try {
            const project = await mainProjectModel.getMainProject(project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }
                
            const commits = await githubModel.getCommitsUser(project_name, repository, login);
            return res.status(200).json({ message: `Commits of ${login}`, data: commits });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error getting commits', error: error.message });
        }
    }
    
    async getCommitsTaskRef(req, res) {
        const { project_name, repository, login } = req.query;
        try {
            const project = await mainProjectModel.getMainProject(project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }
                
            const commitsTaskRef = await githubModel.getCommitsTaskRef(project_name, repository);
            return res.status(200).json({ message: 'Commits task reference', data: commitsTaskRef });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error getting commits task reference', error: error.message });
        }
    }

    async getModifiedLines(req, res) {
        const { project_name, repository, login } = req.query;
        try {
            const project = await mainProjectModel.getMainProject(project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }
                
            const modifiedLines = await githubModel.getModifiedLines(project_name, repository, login);
            return res.status(200).json({ message: 'Modified lines', data: modifiedLines });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error getting modified lines', error: error.message });
        }
    }    

}

module.exports = new GithubController();