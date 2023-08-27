const dataModel = require('../models/TaskModel');

class TaskController {

  async getUnassignedTasks(req, res) {
    try {
      const tasks = await dataModel.getUnassignedTasks();
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting unassigned tasks' });
    }
  }

}

module.exports = new TaskController();