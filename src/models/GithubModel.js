const pool = require('../../db/connection');

class GithubIssuesModel {

    async getGithubUser(id) {
      const query = ` 
        SELECT *
        FROM
          github_users
        WHERE
          id = $1;       
        `;
      const result = await pool.query(query, [id]);
      return result.rows;
  }

  async addGithubUser(user) {
      const { login, id, url, type, admin } = user;
      const query = `
        INSERT INTO github_users (id, login, url, type, admin)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await pool.query(query, [id, login, url, type, admin]);
  }

  async checkGithubUser(user, assignee) {
      const user_id = user.id;
      const githubUser = await this.getGithubUser(user_id);
      if (!githubUser.length) {
          await this.addGithubUser(user);
      }
      const assignee_id = assignee.id;
      const githubAssignee = await this.getGithubUser(assignee_id);
      if (!githubAssignee.length) {
          await this.addGithubUser(assignee);
      }
  }

  async addGithubIssue(issue, user, assignee) {
      await this.checkGithubUser(user, assignee);

      const query = `
        INSERT INTO github_issues (id, project_name, user_id, assignee_id, url, html_url, number, title, body, created_at, updated_at, closed_at, state, labels_name)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `;
      await pool.query(query, [issue.id, issue.project_name, user.id, assignee.id, issue.url, issue.html_url, issue.number, issue.title, issue.body, issue.created_at, issue.updated_at, issue.closed_at, issue.state, issue.labels_name]);
  }
  
}

module.exports = new GithubIssuesModel();
