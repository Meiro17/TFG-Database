const pool = require('../../db/connection');

class GithubModel {

    async getUser(id) {
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

    async getIssue(project_name, id) {
        const query = `
          SELECT *
          FROM
            github_issues
          WHERE
            id = $2 AND
            project_name = $1;  
          `;
        const result = await pool.query(query, [project_name, id]);
        return result.rows;
    }

    async getCommit(project_name, sha) {
        const query = `
          SELECT *
          FROM
            github_commits
          WHERE
            sha = $2 AND
            project_name = $1; 
          `;
        const result = await pool.query(query, [project_name, sha]);
        return result.rows;
  }

    async addUser(user) {
        const { login, id, url, type, admin } = user;
        const query = `
          INSERT INTO github_users (id, login, url, type, admin)
          VALUES ($1, $2, $3, $4, $5)
        `;
        await pool.query(query, [id, login, url, type, admin]);
    }

    async checkUser(user) {
        const user_id = user.id;
        const githubUser = await this.getUser(user_id);
        if (!githubUser.length) {
            await this.addUser(user);
        }     
    }

    async addIssue(main_project, issue, user, assignee) {
        await this.checkUser(user);
        await this.checkUser(assignee);

        const query = `
          INSERT INTO github_issues (id, project_name, user_id, assignee_id, url, html_url, number, title, body, created_at, updated_at, closed_at, state, labels_name)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        `;
        await pool.query(query, [issue.id, main_project.project_name, user.id, assignee.id, issue.url, issue.html_url, issue.number, issue.title, issue.body, issue.created_at, issue.updated_at, issue.closed_at, issue.state, issue.labels_name]);   
    }

    async addCommit(main_project, commit, user) {
      await this.checkUser(user);

      const query = `
        INSERT INTO github_commits (sha, project_name, user_id, url, repository, date, message, message_char_count, message_word_count, task_is_written, task_reference, verified, verified_reason, stats_total, stats_additions, stats_deletions)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      `;
      await pool.query(query, [commit.sha, main_project.project_name, user.id, commit.url, commit.repository, commit.date, commit.message, commit.message_char_count, commit.message_word_count, commit.task_is_written, commit.task_reference, commit.verified, commit.verified_reason, commit.stats_total, commit.stats_additions, commit.stats_deletions]);
    }
  
}

module.exports = new GithubModel();
