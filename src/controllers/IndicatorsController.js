const mainProjectModel = require('../models/MainProjectModel');
const indicatorsModel = require('../models/IndicatorsModel');

class IndicatorsController {

    async addIndicator(req, res) {
        const { main_project, strategic_indicator } = req.body;
        try {
            const mainProject = await mainProjectModel.getMainProject(main_project.project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }
            
            await indicatorsModel.addIndicator(main_project, strategic_indicator);
            return res.status(200).json({ message: 'Strategic Indicator added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Strategic Indicator already exists' });
            } else {
                return res.status(500).json({ message: 'Error adding Strategic Indicator', arguments: error.message });
            }
        }
    }

    async getIndicator(req, res) {
        const { project_name, strategic_indicator } = req.query;
        try {
            const mainProject = await mainProjectModel.getMainProject(project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const strategic_indicator_data = await indicatorsModel.getIndicator(project_name, strategic_indicator);
            if (!strategic_indicator_data.length) {
                return res.status(404).json({ message: 'Strategic Indicator not found' });
            }
            return res.status(200).json({ message: 'Strategic Indicator found', data: strategic_indicator_data });
        } catch (error) {
            return res.status(500).json({ message: 'Error getting Strategic Indicator', arguments: error.message });
        }
    }

}

module.exports = new IndicatorsController();