const taigaTasksModel = require('../models/TaigaTasksModel');
const mainProjectModel = require('../models/MainProjectModel');

class TaigaTasksController {

  async getUnassignedTasks(req, res) {
      const { project_name } = req.query;
      try {
          const tasks = await taigaTasksModel.getUnassignedTasks(project_name);
          if (tasks.length) {
              res.status(200).json(tasks);
          } else {
              if (project_name == null) {
                  res.status(400).json({ message: 'Project name is null' });
              } else {
                  try {
                      const mainProject = await mainProjectModel.getMainProject(project_name);
                      if (mainProject.length) {
                          res.status(404).json({ message: 'No unassigned tasks found', data: tasks });
                      } else {
                          res.status(404).json({ message: 'Project not found' });
                      }
                  } catch (error) {
                      console.error(error);
                      res.status(500).json({ message: 'Error getting Main Project' });
                  }
              }              
          }
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error getting unassigned tasks', error: error.message });
      }
  }

}

module.exports = new TaigaTasksController();