const pool = require('../../db/connection');
const githubUsersModel = require('../models/GithubUsersModel');

class GithubIssuesModel {

  async addGithubIssue(issue, user, assignee) {
      githubUsersModel.checkGithubUser(user, assignee);

      const query = `
        INSERT INTO github_issues (id, project_name, user_id, assignee_id, url, html_url, number, title, body, created_at, updated_at, closed_at, state, labels_name)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `;
      await pool.query(query, [issue.id, issue.project_name, user.id, assignee.id, issue.url, issue.html_url, issue.number, issue.title, issue.body, issue.created_at, issue.updated_at, issue.closed_at, issue.state, issue.labels_name]);
      
  }
  
}

module.exports = new GithubIssuesModel();
