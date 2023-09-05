const mainProjectModel = require('../models/MainProjectModel');

class MainProjectController {

    async addMainProject(req, res) {
        const { project_name } = req.body;
        try {
            await mainProjectModel.addMainProject(project_name);
            res.json({ message: 'Main Project added correctly' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding Main Project' });
        }
    }

    async getMainProject(req, res) {
        const { project_name } = req.query;
        try {
            const mainProject = await mainProjectModel.getMainProject(project_name);
            if(mainProject.length > 0) {
                res.json({ message: 'Project found', data: mainProject });
            } else {
                res.json({ message: 'No project found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error getting Main Project' });
        }
    }  

}

module.exports = new MainProjectController();