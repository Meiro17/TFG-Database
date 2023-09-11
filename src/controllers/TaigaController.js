const taigaModel = require('../models/TaigaModel');
const mainProjectModel = require('../models/MainProjectModel');

class TaigaController {
/*Task*/
    async addTask(req, res) {
        const { main_project, task } = req.body;
        try {
            const project = await mainProjectModel.getMainProject(main_project.project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            await taigaModel.addTask(main_project, task);
            return res.status(200).json({ message: 'Taiga Task added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Taiga Task already exists' });
            } else {
                return res.status(500).json({ message: 'Error adding Taiga Task', arguments: error.message });
            }
        }
    }

    async updateTask(req, res) {
        const { main_project, task } = req.body;
        try {
            const mainProject = await mainProjectModel.getMainProject(main_project.project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const task_exists = await taigaModel.getTask(main_project.project_name, task.id);
            if (!task_exists.length) {
                return res.status(404).json({ message: 'Taiga Task not found' });
            }

            await taigaModel.updateTask(main_project, task);
            return res.status(200).json({ message: 'Taiga Task updated' });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating Taiga Task', arguments: error.message });
        }
    }

    async deleteTask(req, res) {
        const { project_name, id } = req.query;
        try {
            const mainProject = await mainProjectModel.getMainProject(project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const task_exists = await taigaModel.getTask(project_name, id);
            if (!task_exists.length) {
                return res.status(404).json({ message: 'Taiga Task not found' });
            }

            const task_data = await taigaModel.deleteTask(project_name, id);
            return res.status(200).json({ message: 'Taiga Task deleted', data: task_data });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting Taiga Task', arguments: error.message });
        }
    }

/*UserStory*/
    async addUserStory(req, res) {
        const { main_project, userstory } = req.body;
        try {
            const project = await mainProjectModel.getMainProject(main_project.project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            await taigaModel.addUserStory(main_project, userstory);
            return res.status(200).json({ message: 'Taiga User Story added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Taiga User Story already exists' });
            } else {
                return res.status(500).json({ message: 'Error adding Taiga User Story', arguments: error.message });
            }
        }
    }

    async updateUserStory(req, res) {
        const { main_project, userstory } = req.body;
        try {
            const mainProject = await mainProjectModel.getMainProject(main_project.project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const userstory_exists = await taigaModel.getUserStory(main_project.project_name, userstory.id);
            if (!userstory_exists.length) {
                return res.status(404).json({ message: 'Taiga User Story not found' });
            }

            await taigaModel.updateUserStory(main_project, userstory);
            return res.status(200).json({ message: 'Taiga User Story updated' });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating Taiga User Story', arguments: error.message });
        }
    }

    async deleteUserStory(req, res) {
        const { project_name, id } = req.query;
        try {
            const mainProject = await mainProjectModel.getMainProject(project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const userstory_exists = await taigaModel.getUserStory(project_name, id);
            if (!userstory_exists.length) {
                return res.status(404).json({ message: 'Taiga User Story not found' });
            }

            const userstory_data = await taigaModel.deleteUserStory(project_name, id);
            return res.status(200).json({ message: 'Taiga User Story deleted', data: userstory_data });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting Taiga User Story', arguments: error.message });
        }
    }

/*Epic*/
    async addEpic(req, res) {
        const { main_project, epic } = req.body;
        try {
            const project = await mainProjectModel.getMainProject(main_project.project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            await taigaModel.addEpic(main_project, epic);
            return res.status(200).json({ message: 'Taiga Epic added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Taiga Epic already exists' });
            } else {
                return res.status(500).json({ message: 'Error adding Taiga Epic', arguments: error.message });
            }
        }
    }

    async updateEpic(req, res) {
        const { main_project, epic } = req.body;
        try {
            const mainProject = await mainProjectModel.getMainProject(main_project.project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const epic_exists = await taigaModel.getEpic(main_project.project_name, epic.id);
            if (!epic_exists.length) {
                return res.status(404).json({ message: 'Taiga Epic not found' });
            }

            await taigaModel.updateEpic(main_project, epic);
            return res.status(200).json({ message: 'Taiga Epic updated' });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating Taiga Epic', arguments: error.message });
        }
    }

    async deleteEpic(req, res) {
        const { project_name, id } = req.query;
        try {
            const mainProject = await mainProjectModel.getMainProject(project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const epic_exists = await taigaModel.getEpic(project_name, id);
            if (!epic_exists.length) {
                return res.status(404).json({ message: 'Taiga Epic not found' });
            }

            const epic_data = await taigaModel.deleteEpic(project_name, id);
            return res.status(200).json({ message: 'Taiga Epic deleted', data: epic_data });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting Taiga Epic', arguments: error.message });
        }
    }

/*Issue*/
    async addIssue(req, res) {
        const { main_project, issue } = req.body;
        try {
            const project = await mainProjectModel.getMainProject(main_project.project_name);
            if (!project.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            await taigaModel.addIssue(main_project, issue);
            res.status(200).json({ message: 'Taiga Issue added correctly' });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Taiga Issue already exists' });
            } else {
                return res.status(500).json({ message: 'Error adding Taiga Issue', arguments: error.message });
            }
        }
    }

    async updateIssue(req, res) {
        const { main_project, issue } = req.body;
        try {
            const mainProject = await mainProjectModel.getMainProject(main_project.project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const issue_exists = await taigaModel.getIssue(main_project.project_name, issue.id);
            if (!issue_exists.length) {
                return res.status(404).json({ message: 'Taiga Issue not found' });
            }

            await taigaModel.updateIssue(main_project, issue);
            return res.status(200).json({ message: 'Taiga Issue updated' });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating Taiga Issue', arguments: error.message });
        }
    }

    async deleteIssue(req, res) {
        const { project_name, id } = req.query;
        try {
            const mainProject = await mainProjectModel.getMainProject(project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const issue_exists = await taigaModel.getIssue(project_name, id);
            if (!issue_exists.length) {
                return res.status(404).json({ message: 'Taiga Issue not found' });
            }

            const issue_data = await taigaModel.deleteIssue(project_name, id);
            return res.status(200).json({ message: 'Taiga Issue deleted', data: issue_data });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting Taiga Issue', arguments: error.message });
        }
    }     

/**/
    async getUnassignedTasks(req, res) {
        const { project_name } = req.query;
        try {
            const mainProject = await mainProjectModel.getMainProject(project_name);
            if (!mainProject.length) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const unassigned_tasks = await taigaModel.getUnassignedTasks(project_name);
            return res.status(200).json({ message: 'Unassigned tasks', data: unassigned_tasks });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error getting unassigned tasks', error: error.message });
        }
  }

}

module.exports = new TaigaController();