const pool = require('../../db/connection');

class indicatorsModel {

    async addIndicator(main_project, strategic_indicator) {
        const query = ` 
          INSERT INTO strategic_indicators (project_name, strategic_indicator, datasource, description, evaluation_date, name, value)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        await pool.query(query, [
          main_project.project_name, 
          strategic_indicator.strategic_indicator, 
          strategic_indicator.datasource, 
          strategic_indicator.description, 
          strategic_indicator.evaluation_date, 
          strategic_indicator.name, 
          strategic_indicator.value
        ]);
    }

    async getIndicator(project_name, strategic_indicator) {
        const query = `
          SELECT * 
          FROM 
            strategic_indicators
          WHERE 
            project_name = $1 AND
            strategic_indicator = $2;
        `;
        const result = await pool.query(query, [
          project_name, 
          strategic_indicator
        ]);
        return result.rows;
    }

}

module.exports = new indicatorsModel();