-- Table to represent main projects
CREATE TABLE main_project (
    project_name TEXT PRIMARY KEY,
);

/******************************************************************************/
/************************************TAIGA*************************************/
/******************************************************************************/

-- Table to store information about Taiga Issues
CREATE TABLE taiga_issues (
    id TEXT PRIMARY KEY,
    project_name TEXT REFERENCES main_project(project_name),
    -- Fields for Taiga Issues information
    subject TEXT,
    description TEXT,
    severity TEXT,
    priority TEXT,
    type TEXT,
    status TEXT,
    created_date DATE,
    modified_date DATE,
    finished_date DATE,
    assigned TEXT,
    is_closed BOOLEAN
);

-- Table to store information about Taiga Epics
CREATE TABLE taiga_epics (
    id TEXT PRIMARY KEY,
    project_name TEXT REFERENCES main_project(project_name),
    -- Fields for Taiga Epics information
    subject TEXT,
    status TEXT,
    created_date DATE,
    modified_date DATE,
    progress FLOAT,
    total FLOAT,
    is_closed BOOLEAN
);

-- Table to store information about Taiga User Stories
CREATE TABLE taiga_userstories (
    id TEXT PRIMARY KEY,
    project_name TEXT REFERENCES main_project(project_name),
    -- Fields for Taiga User Stories information
    subject TEXT,
    status TEXT,
    created_date DATE,
    modified_date DATE,
    finished_date DATE,
    assigned TEXT,
    total_points INTEGER,
    acceptance_criteria BOOLEAN,
    priority BOOLEAN,
    pattern BOOLEAN,
    is_closed BOOLEAN,
    reference INTEGER,
    milestone_name TEXT,
    milestone_id TEXT,
    milestone_total_points INTEGER,
    milestone_closed_points INTEGER,
    milestone_created_date DATE,
    milestone_modified_date DATE,
    milestone_estimated_start DATE,
    milestone_estimated_finish DATE,
    milestone_closed BOOLEAN
);

-- Table to store information about Taiga Tasks
CREATE TABLE taiga_tasks (
    id TEXT PRIMARY KEY,
    project_name TEXT REFERENCES main_project(project_name),
    -- Fields for Taiga Tasks information
    subject TEXT,
    status TEXT,
    created_date DATE,
    modified_date DATE,
    finished_date DATE,
    assigned TEXT,
    estimated_effort FLOAT,
    actual_effort FLOAT,
    is_closed BOOLEAN,
    reference INTEGER,
    milestone_name TEXT,
    milestone_id TEXT,
    milestone_total_points INTEGER,
    milestone_closed_points INTEGER,
    milestone_created_date DATE,
    milestone_modified_date DATE,
    milestone_estimated_start DATE,
    milestone_estimated_finish DATE,
    milestone_closed BOOLEAN
);

/******************************************************************************/
/************************************GITHUB************************************/
/******************************************************************************/

-- Table to store information about GitHub Users
CREATE TABLE github_users (
    id TEXT PRIMARY KEY,
    -- Fields for GitHub Userse information
    login TEXT,
    url TEXT,
    type TEXT,
    admin TEXT
);

-- Table to store information about GitHub Issues
CREATE TABLE github_issues (
    id TEXT PRIMARY KEY,
    project_name TEXT REFERENCES main_project(project_name),
    user_id TEXT REFERENCES github_users(id),
    assignee_id TEXT REFERENCES github_users(id),
    -- Fields for GitHub Issues information
    url TEXT,
    html_url TEXT,
    number TEXT,
    title TEXT,
    body TEXT,
    created_at DATE,
    updated_at DATE,
    closed_at DATE,
    state TEXT,
    labels_name TEXT
);

-- Table to store information about GitHub Commits
CREATE TABLE github_commits (
    sha TEXT PRIMARY KEY,
    project_name TEXT REFERENCES main_project(project_name),
    user_id TEXT REFERENCES github_users(id),
    -- Fields for GitHub Commits information
    url TEXT,
    repository TEXT,
    date TEXT,
    message TEXT,
    message_char_count BIGINT,
    message_word_count BIGINT,
    task_is_written BOOLEAN,
    task_reference TEXT,
    verified TEXT,
    verified_reason TEXT,
    stats_total BIGINT,
    stats_additions BIGINT,
    stats_deletions BIGINT
);

/******************************************************************************/
/****************************INDICATORS/FACTORS********************************/
/******************************************************************************/

-- Table to store information about Factors
CREATE TABLE factors (
    project TEXT PRIMARY KEY REFERENCES main_project(project_name),
    -- Fields for Factors information
    factor TEXT,
    evaluation_date DATE,
    indicators TEXT,
    weights DOUBLE PRECISION[],
    name TEXT,
    description TEXT,
    datasource TEXT,
    value DOUBLE PRECISION,
    info TEXT,
    type TEXT
);

-- Table to store information about Strategic Indicators
CREATE TABLE strategic_indicators (
    project TEXT PRIMARY KEY REFERENCES main_project(project_name),
    -- Fields for Strategic Indicators information
    datasource TEXT,
    description TEXT,
    evaluation_date DATE,
    strategic_indicator TEXT,
    name TEXT,
    value DOUBLE PRECISION
);
