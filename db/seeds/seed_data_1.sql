-- Insert data into the main_project table
INSERT INTO main_project (project_name) VALUES
    ('Project A'),
    ('Project B'),
    ('Project C');

-- Insert data into the github_users table
INSERT INTO github_users (id, login, url, type, admin) VALUES
    ('user1', 'user1', 'https://github.com/user1', 'type1', 'no'),
    ('user2', 'user2', 'https://github.com/user2', 'type2', 'yes'),
    ('user3', 'user3', 'https://github.com/user3', 'type3', 'no');

-- Insert data into the github_issues table
INSERT INTO github_issues (id, project_name, user_id, assignee_id, url, html_url, number, title, body, created_at, updated_at, closed_at, state, labels_name) VALUES
    ('issue1', 'Project A', 'user1', 'user2', 'https://github.com/issue1', 'https://github.com/issue1', '1', 'Title of Issue 1', 'Description of Issue 1', '2023-09-01', '2023-09-02', NULL, 'open', 'label1'),
    ('issue2', 'Project B', 'user2', 'user3', 'https://github.com/issue2', 'https://github.com/issue2', '2', 'Title of Issue 2', 'Description of Issue 2', '2023-09-03', '2023-09-04', '2023-09-05', 'closed', 'label2');

-- Insert data into the github_commits table
INSERT INTO github_commits (sha, project_name, user_id, url, repository, date, message, message_char_count, message_word_count, task_is_written, task_reference, verified, verified_reason, stats_total, stats_additions, stats_deletions) VALUES
    ('commit1', 'Project A', 'user1', 'https://github.com/commit1', 'repository1', '2023-09-01', 'Commit Message 1', 100, 20, true, 'task1', 'verified', 'Verification Reason 1', 500, 200, 300),
    ('commit2', 'Project B', 'user2', 'https://github.com/commit2', 'repository2', '2023-09-03', 'Commit Message 2', 120, 25, false, NULL, 'unverified', NULL, 600, 300, 300);

-- Insert data into the taiga_issues table (similar to github_issues)
INSERT INTO taiga_issues (id, project_name, subject, description, severity, priority, type, status, created_date, modified_date, finished_date, assigned, is_closed) VALUES
    ('taiga_issue1', 'Project A', 'Subject of Taiga Issue 1', 'Description of Taiga Issue 1', 'High', 'Urgent', 'Bug', 'open', '2023-09-01', '2023-09-02', NULL, 'user1', false),
    ('taiga_issue2', 'Project B', 'Subject of Taiga Issue 2', 'Description of Taiga Issue 2', 'Medium', 'Normal', 'Task', 'closed', '2023-09-03', '2023-09-04', '2023-09-05', 'user2', true);

-- Insert data into the taiga_epics table (similar to github_issues)
INSERT INTO taiga_epics (id, project_name, subject, status, created_date, modified_date, progress, total, is_closed) VALUES
    ('taiga_epic1', 'Project A', 'Subject of Taiga Epic 1', 'open', '2023-09-01', '2023-09-02', 0.5, 100, false),
    ('taiga_epic2', 'Project B', 'Subject of Taiga Epic 2', 'closed', '2023-09-03', '2023-09-04', 0.8, 200, true);

-- Insert data into the taiga_userstories table (similar to github_issues)
INSERT INTO taiga_userstories (id, project_name, subject, status, created_date, modified_date, finished_date, assigned, total_points, acceptance_criteria, priority, pattern, is_closed, reference, milestone_name, milestone_id, milestone_total_points, milestone_closed_points, milestone_created_date, milestone_modified_date, milestone_estimated_start, milestone_estimated_finish, milestone_closed) VALUES
    ('taiga_userstory1', 'Project A', 'Subject of Taiga User Story 1', 'open', '2023-09-01', '2023-09-02', NULL, 'user1', 10, true, false, true, false, 1, 'Milestone 1', 'milestone1', 50, 25, '2023-09-01', '2023-09-02', '2023-09-05', '2023-09-10', false),
    ('taiga_userstory2', 'Project B', 'Subject of Taiga User Story 2', 'closed', '2023-09-03', '2023-09-04', '2023-09-05', 'user2', 15, false, true, false, true, 2, 'Milestone 2', 'milestone2', 40, 20, '2023-09-02', '2023-09-03', '2023-09-08', '2023-09-15', true);

-- Insert data into the taiga_tasks table (similar to github_issues)
INSERT INTO taiga_tasks (id, project_name, subject, status, created_date, modified_date, finished_date, assigned, estimated_effort, actual_effort, is_closed, reference, milestone_name, milestone_id, milestone_total_points, milestone_closed_points, milestone_created_date, milestone_modified_date, milestone_estimated_start, milestone_estimated_finish, milestone_closed) VALUES
    ('taiga_task1', 'Project A', 'Subject of Taiga Task 1', 'open', '2023-09-01', '2023-09-02', NULL, 'user1', 5.0, 3.0, false, 1, 'Milestone 1', 'milestone1', 20, 10, '2023-09-01', '2023-09-02', '2023-09-05', '2023-09-10', false),
    ('taiga_task2', 'Project B', 'Subject of Taiga Task 2', 'closed', '2023-09-03', '2023-09-04', '2023-09-05', 'user2', 7.5, 7.5, true, 2, 'Milestone 2', 'milestone2', 15, 15, '2023-09-02', '2023-09-03', '2023-09-08', '2023-09-15');

-- Insert data into the factors table
INSERT INTO factors (project, factor, evaluation_date, indicators, weights, name, description, datasource, value, info, type) VALUES
    ('Project A', 'Factor 1', '2023-09-01', 'Indicator1', '{0.5, 0.5}', 'Factor One', 'Description of Factor One', 'Data Source 1', 0.75, 'Additional Information', 'Type A'),
    ('Project B', 'Factor 2', '2023-09-02', 'Indicator2', '{0.3, 0.7}', 'Factor Two', 'Description of Factor Two', 'Data Source 2', 0.65, 'Additional Information', 'Type B');

-- Insert data into the strategic_indicators table
INSERT INTO strategic_indicators (project, datasource, description, evaluation_date, strategic_indicator, name, value) VALUES
    ('Project A', 'Source 1', 'Description of Strategic Indicator 1', '2023-09-01', 'Indicator1', 'Strategic Indicator One', 0.85),
    ('Project B', 'Source 2', 'Description of Strategic Indicator 2', '2023-09-02', 'Indicator2', 'Strategic Indicator Two', 0.70);

