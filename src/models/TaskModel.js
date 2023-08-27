const pool = require('../../db/connection');

class TaskModel {

  async getUnassignedTasks() {
    const query = `
      SELECT 
        COUNT(*) AS tasksTotal, 
        SUM(CASE WHEN assigned IS NULL THEN 1 ELSE 0 END) AS tasksUnassigned 
      FROM 
        tasks 
      WHERE 
        milestone_closed = false;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

}

module.exports = new TaskModel();