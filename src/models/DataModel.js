const pool = require('../../db/connection');

class DataModel {

  async getUsers() {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    return result.rows;
  }

//   async addUser(nombre, email) {
//     const query = 'INSERT INTO users (nombre, email) VALUES ($1, $2)';
//     await pool.query(query, [nombre, email]);
//   }

}

module.exports = new DataModel();
