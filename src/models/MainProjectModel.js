const pool = require('../../db/connection');
class MainProjectModel {

  async addMainProject(project_name) {
      const query = ` 
        INSERT INTO main_project (project_name) VALUES ($1);       
        `;
      await pool.query(query, [project_name]);
  }

  async getMainProject(project_name) {
      const query = `
        SELECT * 
        FROM 
          main_project 
        WHERE 
          project_name = $1;
      `;
      const result = await pool.query(query, [project_name]);
      return result.rows;
  }

}

module.exports = new MainProjectModel();
