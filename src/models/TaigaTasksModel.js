const pool = require('../../db/connection');

class TaigaTasksModel {

  async getUnassignedTasks(project_name) {
      const query = `
        SELECT 
          COUNT(*) AS tasksTotal, 
          SUM(CASE WHEN assigned IS NULL THEN 1 ELSE 0 END) AS tasksUnassigned 
        FROM 
          taiga_tasks 
        WHERE 
          milestone_closed = false AND
          project_name = $1;
      `;
      const result = await pool.query(query, [project_name]);
      const stats = {
        tasksTotal: result.rows[0].taskstotal,
        tasksUnassigned: result.rows[0].tasksunassigned
      };

      return stats;
  }

}

module.exports = new TaigaTasksModel();