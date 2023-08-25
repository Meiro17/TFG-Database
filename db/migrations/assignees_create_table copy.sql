CREATE TABLE IF NOT EXISTS assignees
(
    assignee_id integer NOT NULL,
    login text COLLATE pg_catalog."default",
    url text COLLATE pg_catalog."default",
    type text COLLATE pg_catalog."default",
    CONSTRAINT assignees_pkey PRIMARY KEY (assignee_id)
)