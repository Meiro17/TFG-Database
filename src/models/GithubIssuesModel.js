const pool = require('../../db/connection');

class GithubIssuesModel {

  async addGithubIssue(issue, user, assignee) {
      const query = ` 
        INSERT INTO main_project (project_name) VALUES ($1);       
        `;
      await pool.query(query, [project_name]);
  }

}

module.exports = new GithubIssuesModel();
