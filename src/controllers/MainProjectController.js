const mainProjectModel = require('../models/MainProjectModel');

class MainProjectController {

    async addMainProject(req, res) {
        const { project_name } = req.body;
        try {
            await mainProjectModel.addMainProject(project_name);
            res.json({ message: 'Main Project added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                // Duplicate key error (project already exists)
                res.status(400).json({ message: 'Project already exists' });
            } else {
                // Other unexpected error
                res.status(500).json({ message: 'Error adding Main Project' });
            }
        }
    }

    async getMainProject(req, res) {
        const { project_name } = req.query;
        try {
            const mainProject = await mainProjectModel.getMainProject(project_name);
            if (mainProject.length) {
                res.json({ message: 'Project found', data: mainProject });
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error getting Main Project' });
        }
    }

}

module.exports = new MainProjectController();