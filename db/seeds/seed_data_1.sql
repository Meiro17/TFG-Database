-- userstories
INSERT INTO userstories (id, subject, status, created_date, modified_date, finished_date, assigned, total_points, acceptance_criteria, priority, pattern, is_closed, reference, milestone_name, milestone_id, milestone_total_points, milestone_closed_points, milestone_created_date, milestone_modified_date, milestone_estimated_start, milestone_estimated_finish, milestone_closed)
VALUES
  (1,'User Story 1','open','2023-08-01 10:00:00','2023-08-02 11:30:00',NULL,'sarah',8,true,true,true,false,123,'Milestone 1','ms1',20,10,'2023-08-01 08:00:00','2023-08-02 10:00:00','2023-08-01 09:00:00','2023-08-03 12:00:00',false),
  (2,'User Story 2','open','2023-08-02 09:30:00','2023-08-03 10:45:00',NULL,'mike',13,true,false,false,false,456,'Milestone 2','ms2',15,5,'2023-08-02 08:00:00','2023-08-03 10:00:00','2023-08-03 09:00:00','2023-08-04 12:00:00',false),
  (3,'User Story 3','open','2023-08-03 08:15:00','2023-08-04 09:30:00',NULL,'emily',5,true,true,false,true,789,'Milestone 1','ms1',20,10,'2023-08-01 08:00:00','2023-08-02 10:00:00','2023-08-01 09:00:00','2023-08-03 12:00:00',false);

-- users
INSERT INTO users (user_id, login, url, type)
VALUES
  (1,'johndoe','https://example.com/johndoe','regular'),
  (2,'alice','https://example.com/alice','admin'),
  (3,'bob','https://example.com/bob','regular');

-- tasks
INSERT INTO tasks (id, subject, status, created_date, modified_date, finished_date, assigned, estimated_effort, actual_effort, is_closed, reference, milestone_name, milestone_id, milestone_total_points, milestone_closed_points, milestone_created_date, milestone_modified_date, milestone_estimated_start, milestone_estimated_finish, milestone_closed)
VALUES
  (1,'Task 1','in-progress','2023-08-01 10:00:00','2023-08-02 11:30:00',NULL,'sarah',8,5,false,123,'Milestone 1','ms1',20,10,'2023-08-01 08:00:00','2023-08-02 10:00:00','2023-08-01 09:00:00','2023-08-03 12:00:00',false),
  (2,'Task 2','open','2023-08-02 09:30:00','2023-08-03 10:45:00',NULL,'mike',10,8,false,456,'Milestone 2','ms2',15,5,'2023-08-02 08:00:00','2023-08-03 10:00:00','2023-08-03 09:00:00','2023-08-04 12:00:00',false),
  (3,'Task 3','in-progress','2023-08-03 08:15:00','2023-08-04 09:30:00',NULL,'emily',6,7,false,789,'Milestone 1','ms1',20,10,'2023-08-01 08:00:00','2023-08-02 10:00:00','2023-08-01 09:00:00','2023-08-03 12:00:00',false);

-- taiga_issues
INSERT INTO taiga_issues (id, subject, description, severity, priority, type, status, created_date, modified_date, finished_date, assigned, is_closed)
VALUES
  (1,'Issue 1','Description for issue 1','high','urgent','bug','open','2023-08-01 10:00:00','2023-08-02 11:30:00',NULL,'sarah',false),
  (2,'Issue 2','Description for issue 2','medium','high','feature','in-progress','2023-08-02 09:30:00','2023-08-03 10:45:00',NULL,'mike',false),
  (3,'Issue 3','Description for issue 3','low','normal','bug','closed','2023-08-03 08:15:00','2023-08-04 09:30:00','2023-08-05 10:00:00',NULL,true);

-- git_issues
INSERT INTO git_issues (id, url, html_url, number, title, user_id, assignee_id, body, created_at, updated_at, closed_at, state, labels)
VALUES
  (1,'https://example.com/issue1','https://example.com/issue1/123','123','Issue 1',1,1,'This is the body of issue 1.','2023-08-01 10:00:00','2023-08-02 11:30:00','2023-08-03 12:45:00','closed','{bug,feature}'),
  (2,'https://example.com/issue2','https://example.com/issue2/456','456','Issue 2',2,2,'This is the body of issue 2.','2023-08-02 09:30:00','2023-08-03 10:45:00',NULL,'open','{feature}'),
  (3,'https://example.com/issue3','https://example.com/issue3/789','789','Issue 3',1,3,'This is the body of issue 3.','2023-08-03 08:15:00','2023-08-04 09:30:00',NULL,'in-progress','{bug}');

-- epics
INSERT INTO epics (id, subject, status, created_date, modified_date, progress, total, is_closed)
VALUES
  (1,'Epic 1','open','2023-08-01 10:00:00','2023-08-02 11:30:00',60,100,false),
  (2,'Epic 2','in-progress','2023-08-02 09:30:00','2023-08-03 10:45:00',40,80,false),
  (3,'Epic 3','closed','2023-08-03 08:15:00','2023-08-04 09:30:00',100,100,true);

-- commits
INSERT INTO commits (commit_id, sha, url, user_id, repository, date, message, message_char_count, message_word_count, task_is_written, task_reference, task_id, verified, verified_reason, stats_additions, stats_deletions, stats_total)
VALUES
  (1,'abc123','https://github.com/repo1',1,'repo1','2023-08-01 10:00:00','Initial commit.',15,3,true,'Task 1',1,true,'Code review passed.',10,5,15),
  (2,'def456','https://github.com/repo2',2,'repo2','2023-08-02 09:30:00','Fix issue.',10,2,false,NULL,NULL,false,NULL,4,2,6),
  (3,'ghi789','https://github.com/repo1',3,'repo1','2023-08-03 08:15:00','Add feature.',12,2,true,'Task 3',3,false,NULL,6,3,9);

-- assignees
INSERT INTO assignees (assignee_id, login, url, type)
VALUES
  (1,'sarah','https://example.com/sarah','regular'),
  (2,'mike','https://example.com/mike','admin'),
  (3,'emily','https://example.com/emily','regular');
