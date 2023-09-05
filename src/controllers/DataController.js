const dataModel = require('../models/MainProjectModel');

class MainProjectController {

  async getMainProject(req, res) {
    try {
      const main_project = await dataModel.getUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting users' });
    }
  }

  async addProject(req, res) {
    const { project_name } = req.body;
    try {
      await dataModel.addUser(nombre, email);
      res.json({ message: 'Usuario añadido correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar usuario' });
    }
  }

}

module.exports = new MainProjectController();
