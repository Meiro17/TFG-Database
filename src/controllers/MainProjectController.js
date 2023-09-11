const mainProjectModel = require('../models/MainProjectModel');

class MainProjectController {

    async addMainProject(req, res) {
        const { project_name } = req.body;
        try {
            await mainProjectModel.addMainProject(project_name);
            res.status(200).json({ message: 'Main Project added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                // Duplicate key error
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
                res.status(200).json({ message: 'Project found', data: mainProject });
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error getting Main Project' });
        }
    }

}

module.exports = new MainProjectController();