const dataModel = require('../models/DataModel');

class DataController {

  async getUsers(req, res) {
    try {
      const users = await dataModel.getUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting users' });
    }
  }

//   async addUser(req, res) {
//     const { nombre, email } = req.body;
//     try {
//       await dataModel.addUser(nombre, email);
//       res.json({ message: 'Usuario añadido correctamente' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error al agregar usuario' });
//     }
//   }

}

module.exports = new DataController();
