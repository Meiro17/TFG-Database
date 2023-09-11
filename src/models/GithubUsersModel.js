const pool = require('../../db/connection');

class GithubUsersModel {

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

}

module.exports = new GithubUsersModel();
