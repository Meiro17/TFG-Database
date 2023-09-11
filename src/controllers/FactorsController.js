const mainProjectModel = require('../models/MainProjectModel');
const factorsModel = require('../models/FactorsModel');

class FactorsController {

    async addFactor(req, res) {
        const { main_project, factor } = req.body;
        try {
            const mainProject = await mainProjectModel.getMainProject(main_project.project_name);
            if (!mainProject.length) {
                res.status(404).json({ message: 'Project not found' });
            }
            
            await factorsModel.addFactor(main_project, factor);
            res.status(200).json({ message: 'Factor added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                res.status(400).json({ message: 'Factor already exist' });
            } else {
                res.status(500).json({ message: 'Error adding Factor', arguments: error.message });
            }
        }
    }

    async updateFactor(req, res) {
        const { main_project, factor } = req.body;
        try {
            const mainProject = await mainProjectModel.getMainProject(main_project.project_name);
            if (!mainProject.length) {
                res.status(404).json({ message: 'Project not found' });
            }

            const factor_exists = await factorsModel.getFactor(main_project.project_name, factor.factor);
            if (!factor_exists.length) {
                res.status(404).json({ message: 'Factor not found' });
            }

            const factor_data = await factorsModel.updateFactor(main_project, factor);
            res.status(200).json({ message: 'Factor updated', data: factor_data });
        } catch (error) {
            res.status(500).json({ message: 'Error updating Factor', arguments: error.message });
        }
    }

    async getFactor(req, res) {
        const { project_name, factor } = req.query;
        try {
            const mainProject = await mainProjectModel.getMainProject(project_name);
            if (!mainProject.length) {
                res.status(404).json({ message: 'Project not found' });
            }
            const factor_data = await factorsModel.getFactor(project_name, factor);
            if (!factor_data.length) {
                res.status(404).json({ message: 'Factor not found' });
            }
            res.status(200).json({ message: 'Factor found', data: factor_data });
        } catch (error) {
            res.status(500).json({ message: 'Error getting Factor', arguments: error.message });
        }
    }

}

module.exports = new FactorsController();