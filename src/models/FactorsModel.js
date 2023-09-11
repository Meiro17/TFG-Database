const pool = require('../../db/connection');

class FactorsModel {

    async addFactor(main_project, factor) {
        const query = ` 
          INSERT INTO factors (project_name, factor, evaluation_date, indicators, weights, name, description, datasource, value, info, type)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;
        await pool.query(query, [
          main_project.project_name, 
          factor.factor, 
          factor.evaluation_date, 
          factor.indicators, 
          factor.weights, 
          factor.name, 
          factor.description, 
          factor.datasource, 
          factor.value, factor.info, 
          factor.type
        ]);
    }

    async updateFactor(main_project, factor) {
      const query = ` 
        UPDATE factors
        SET
          evaluation_date = $1,
          weights = $2,
          name = $3,
          description = $4,
          datasource = $5,
          value = $6,
          info = $7,
          type = $8
        WHERE
          project_name = $9 AND
          factor = $10
      `;
      await pool.query(query, [
        factor.evaluation_date,
        factor.weights,
        factor.name,
        factor.description,
        factor.datasource,
        factor.value,
        factor.info,
        factor.type,
        main_project.project_name,
        factor.factor]
      );
    }

    async getFactor(project_name, factor) {
        const query = `
          SELECT * 
          FROM 
            factors
          WHERE 
            project_name = $1 AND
            factor = $2;
        `;
        const result = await pool.query(query, [
          project_name, 
          factor
        ]);
        return result.rows;
    }

}

module.exports = new FactorsModel();