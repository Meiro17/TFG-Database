const pool = require('../../db/connection');

class TaigaModel {
/*Task*/ 
    async addTask(main_project, task) {
        const query = `
          INSERT INTO taiga_tasks (id, project_name, subject, status, created_date, modified_date, finished_date, assigned, estimated_effort, actual_effort, is_closed, reference, milestone_name, milestone_id, milestone_total_points, milestone_closed_points, milestone_created_date, milestone_modified_date, milestone_estimated_start, milestone_estimated_finish, milestone_closed)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        `;
        await pool.query(query, [
          task.id, 
          main_project.project_name,
          task.subject, 
          task.status, 
          task.created_date,
          task.modified_date,
          task.finished_date,
          task.assigned,
          task.estimated_effort,
          task.actual_effort,
          task.is_closed,
          task.reference,
          task.milestone_name,
          task.milestone_id,
          task.milestone_total_points,
          task.milestone_closed_points,
          task.milestone_created_date,
          task.milestone_modified_date,
          task.milestone_estimated_start,
          task.milestone_estimated_finish,
          task.milestone_closed
        ]);
    }

    async updateTask(main_project, task) {
      const query = ` 
        UPDATE taiga_tasks
        SET
          subject = $1, 
          status = $2, 
          created_date = $3, 
          modified_date = $4, 
          finished_date = $5, 
          assigned = $6, 
          estimated_effort = $7, 
          actual_effort = $8, 
          is_closed = $9, 
          reference = $10, 
          milestone_name = $11, 
          milestone_id = $12, 
          milestone_total_points = $13, 
          milestone_closed_points = $14, 
          milestone_created_date = $15, 
          milestone_modified_date = $16, 
          milestone_estimated_start = $17, 
          milestone_estimated_finish = $18, 
          milestone_closed = $19
        WHERE
          project_name = $20 AND
          id = $21
        RETURNING *
      `;
      const result = await pool.query(query, [
        task.subject, 
        task.status, 
        task.created_date,
        task.modified_date,
        task.finished_date,
        task.assigned,
        task.estimated_effort,
        task.actual_effort,
        task.is_closed,
        task.reference,
        task.milestone_name,
        task.milestone_id,
        task.milestone_total_points,
        task.milestone_closed_points,
        task.milestone_created_date,
        task.milestone_modified_date,
        task.milestone_estimated_start,
        task.milestone_estimated_finish,
        task.milestone_closed,
        main_project.project_name,
        task.id
      ]);
      return result.rows;
    }
    
    async getTask(project_name, id) {
      const query = `
        SELECT * 
        FROM 
          taiga_tasks
        WHERE 
          project_name = $1 AND
          id = $2;
      `;
      const result = await pool.query(query, [
        project_name, 
        id
      ]);
      return result.rows;
    }

    async deleteTask(project_name, id) {
      const query = `
        DELETE  
        FROM 
          taiga_tasks
        WHERE 
          project_name = $1 AND
          id = $2
        RETURNING *;
      `;
      const result = await pool.query(query, [
        project_name, 
        id
      ]);
      return result.rows;
    }

    async getUnassignedTasks(project_name) {
        const query = `
          SELECT 
            COUNT(*) AS unassigned_tasks 
          FROM 
            taiga_tasks 
          WHERE 
            milestone_closed = FALSE AND
            assigned IS NULL AND
            project_name = $1;
        `;
        const result = await pool.query(query, [project_name]);
        return result.rows;
    }

    async getEstimatedEffortTasks(project_name) {
        const query = `
          SELECT 
            COUNT(*) AS estimatedeffort_tasks
          FROM 
            taiga_tasks 
          WHERE 
            milestone_closed = FALSE AND
            estimated_effort IS NOT NULL AND
            project_name = $1;
        `;
        const result = await pool.query(query, [project_name]);
        return result.rows;
    }

    async getAssignedTasks(project_name) {
        const query = `
          WITH AssignedTasks AS (
            SELECT
              assigned,
              COUNT(*) AS task_count
            FROM
              taiga_tasks
            WHERE
              assigned IS NOT NULL
              AND project_name = $1
            GROUP BY
              assigned
          )
          SELECT
            json_object_agg(assigned, task_count) AS assigned_tasks
          FROM
            AssignedTasks;        
        `;        
        const result = await pool.query(query, [project_name]);
        return result.rows[0];
    }

    async getAssignedUserTasks(project_name, assigned) {
      const query1 = `
        SELECT 
          COUNT(*) AS total_tasks
        FROM 
          taiga_tasks
        WHERE
          project_name = $1;
      `; 
      const query2 = `
        SELECT 
          COUNT(*) AS user_tasks
        FROM 
          taiga_tasks
        WHERE 
          project_name = $1
          AND assigned = $2;
      `;       
      const result1 = await pool.query(query1, [project_name]);
      const result2 = await pool.query(query2, [project_name, assigned]);
      return {
        total_tasks: result1.rows[0].total_tasks,
        user_tasks: result2.rows[0].user_tasks
      };
  }

    async getActualEffortClosedTasks(project_name) {
        const query = `
        SELECT
          COUNT(*) AS actualeffort_tasks
        FROM
          taiga_tasks
        WHERE
          project_name = $1
          AND is_closed = true
          AND actual_effort IS NOT NULL
          AND milestone_closed = false;        
        `;        
        const result = await pool.query(query, [project_name]);
        return result.rows[0];
    }

    async getClosedUserTasks(project_name, assigned) {
      const query1 = ` 
        SELECT
          COUNT(*) AS total_tasks
        FROM
          taiga_tasks
        WHERE
          project_name = $1
          AND assigned = $2;      
      `;  
      const query2 = ` 
        SELECT
          COUNT(*) AS closed_tasks
        FROM
          taiga_tasks
        WHERE
          project_name = $1
          AND assigned = $2
          AND is_closed = true;     
      `;        
      const result1 = await pool.query(query1, [project_name, assigned]);
      const result2 = await pool.query(query2, [project_name, assigned]);
      return {
        total_tasks: result1.rows[0].total_tasks,
        closed_user_tasks: result2.rows[0].closed_tasks
      };
  }
    
    async getHighDeviatedTasks(project_name, threshold) {
        const query = `
          SELECT
            COUNT(*) AS high_deviated_tasks
          FROM
            taiga_tasks
          WHERE
            project_name = $1
            AND is_closed = true
            AND estimated_effort IS NOT NULL
            AND actual_effort IS NOT NULL
            AND milestone_closed = false
            AND ABS(actual_effort - estimated_effort) > (estimated_effort * $2) / 100;
        `;
        
        const result = await pool.query(query, [
          project_name,
          threshold
        ]);
        return result.rows[0];
    }

/*UserStory*/ 
    async addUserStory(main_project, userstory) {
        const query = `
          INSERT INTO taiga_userstories (id, project_name, subject, status, created_date, modified_date, finished_date, assigned, total_points, acceptance_criteria, priority, pattern, is_closed, reference, milestone_name, milestone_id, milestone_total_points, milestone_closed_points, milestone_created_date, milestone_modified_date, milestone_estimated_start, milestone_estimated_finish, milestone_closed)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
        `;
        await pool.query(query, [
          userstory.id, 
          main_project.project_name,
          userstory.subject, 
          userstory.status, 
          userstory.created_date,
          userstory.modified_date,
          userstory.finished_date,
          userstory.assigned,
          userstory.total_points,
          userstory.acceptance_criteria,
          userstory.priority,
          userstory.pattern,
          userstory.is_closed,
          userstory.reference,
          userstory.milestone_name,
          userstory.milestone_id,
          userstory.milestone_total_points,
          userstory.milestone_closed_points,
          userstory.milestone_created_date,
          userstory.milestone_modified_date,
          userstory.milestone_estimated_start,
          userstory.milestone_estimated_finish,
          userstory.milestone_closed
        ]);
    }

    async updateUserStory(main_project, userstory) {
        const query = ` 
          UPDATE taiga_userstories
          SET
            subject = $1, 
            status = $2, 
            created_date = $3, 
            modified_date = $4, 
            finished_date = $5, 
            assigned = $6,
            total_points = $7,
            acceptance_criteria = $8,
            priority = $9,
            pattern = $10,
            is_closed = $11, 
            reference = $12, 
            milestone_name = $13, 
            milestone_id = $14, 
            milestone_total_points = $15, 
            milestone_closed_points = $16, 
            milestone_created_date = $17, 
            milestone_modified_date = $18, 
            milestone_estimated_start = $19, 
            milestone_estimated_finish = $20, 
            milestone_closed = $21
          WHERE
            project_name = $22 AND
            id = $23
        `;
        const result = await pool.query(query, [
          userstory.subject, 
          userstory.status, 
          userstory.created_date,
          userstory.modified_date,
          userstory.finished_date,
          userstory.assigned,
          userstory.total_points,
          userstory.acceptance_criteria,
          userstory.priority,
          userstory.pattern,
          userstory.is_closed,
          userstory.reference,
          userstory.milestone_name,
          userstory.milestone_id,
          userstory.milestone_total_points,
          userstory.milestone_closed_points,
          userstory.milestone_created_date,
          userstory.milestone_modified_date,
          userstory.milestone_estimated_start,
          userstory.milestone_estimated_finish,
          userstory.milestone_closed,           
          main_project.project_name,
          userstory.id
        ]);
        return result.rows;
    }
    
    async getUserStory(project_name, id) {
      const query = `
        SELECT * 
        FROM 
          taiga_userstories
        WHERE 
          project_name = $1 AND
          id = $2;
      `;
      const result = await pool.query(query, [
        project_name, 
        id
      ]);
      return result.rows;
    }

    async deleteUserStory(project_name, id) {
      const query = `
        DELETE  
        FROM 
          taiga_userstories
        WHERE 
          project_name = $1 AND
          id = $2
        RETURNING *;
      `;
      const result = await pool.query(query, [
        project_name, 
        id
      ]);
      return result.rows;
    }
    
    async getPatternUserStories(project_name) {
        const query = `
          SELECT
            COUNT(*) AS pattern_userstories
          FROM 
            taiga_userstories
          WHERE 
            project_name = $1 AND
            pattern = true AND
            milestone_closed = false;
        `;
        const result = await pool.query(query, [project_name]);
        return result.rows;
    }

    async getACUsertories(project_name) {
        const query = `
          SELECT
            COUNT(*) AS acceptance_criteria_userstories
          FROM 
            taiga_userstories
          WHERE 
            project_name = $1 
            AND acceptance_criteria = true
            AND milestone_closed = false;
        `;
        const result = await pool.query(query, [project_name]);
        return result.rows;
    }

/*Epic*/ 
    async addEpic(main_project, epic) {
      const query = `
        INSERT INTO taiga_epics (id, project_name, subject, status, created_date, modified_date, progress, total, is_closed)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      await pool.query(query, [
        epic.id, 
        main_project.project_name,
        epic.subject, 
        epic.status, 
        epic.created_date,
        epic.modified_date,
        epic.progress,
        epic.total,
        epic.is_closed
      ]);
    }

    async updateEpic(main_project, epic) {
        const query = ` 
          UPDATE taiga_epics
          SET
            subject = $1, 
            status = $2, 
            created_date = $3, 
            modified_date = $4,
            progress = $5, 
            total = $6, 
            is_closed = $7
          WHERE
            project_name = $8 AND
            id = $9
        `;
        const result = await pool.query(query, [
          epic.subject, 
          epic.status, 
          epic.created_date,
          epic.modified_date,
          epic.progress,
          epic.total,
          epic.is_closed,
          main_project.project_name,
          epic.id
        ]);
        return result.rows;
    }
    
    async getEpic(project_name, id) {
      const query = `
        SELECT * 
        FROM 
          taiga_epics
        WHERE 
          project_name = $1 AND
          id = $2;
      `;
      const result = await pool.query(query, [
        project_name, 
        id
      ]);
      return result.rows;
    }

    async deleteEpic(project_name, id) {
      const query = `
        DELETE  
        FROM 
          taiga_epics
        WHERE 
          project_name = $1 AND
          id = $2
        RETURNING *;
      `;
      const result = await pool.query(query, [
        project_name, 
        id
      ]);
      return result.rows;
    }

/*Issue*/
    async addIssue(main_project, issue) {
      const query = `
        INSERT INTO taiga_issues (id, project_name, subject, description, severity, priority, type, status, created_date, modified_date, finished_date, assigned, is_closed)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `;
      await pool.query(query, [
        issue.id, 
        main_project.project_name,
        issue.subject,
        issue.description,
        issue.severity,
        issue.priority, 
        issue.type,
        issue.status, 
        issue.created_date,
        issue.modified_date,
        issue.finished_date,
        issue.assigned,
        issue.is_closed
      ]);
    }

    async updateIssue(main_project, issue) {
        const query = ` 
          UPDATE taiga_issues
          SET
            subject = $1, 
            description = $2, 
            severity = $3,
            priority = $4, 
            type = $5,
            status = $6,
            created_date = $7, 
            modified_date = $8,
            finished_date = $9, 
            assigned = $10, 
            is_closed = $11
          WHERE
            project_name = $12 AND
            id = $13
        `;
        const result = await pool.query(query, [
          issue.subject,
          issue.description,
          issue.severity,
          issue.priority, 
          issue.type,
          issue.status, 
          issue.created_date,
          issue.modified_date,
          issue.finished_date,
          issue.assigned,
          issue.is_closed,          
          main_project.project_name,
          issue.id
        ]);
        return result.rows;
    }

    async getIssue(project_name, id) {
      const query = `
        SELECT * 
        FROM 
          taiga_issues
        WHERE 
          project_name = $1 AND
          id = $2;
      `;
      const result = await pool.query(query, [
        project_name, 
        id
      ]);
      return result.rows;
    }

    async deleteIssue(project_name, id) {
      const query = `
        DELETE  
        FROM 
          taiga_issues
        WHERE 
          project_name = $1 AND
          id = $2
        RETURNING *;
      `;
      const result = await pool.query(query, [
        project_name, 
        id
      ]);
      return result.rows;
    }    

}

module.exports = new TaigaModel();