CREATE TABLE IF NOT EXISTS userstories
(
    id text COLLATE pg_catalog."default" NOT NULL,
    subject text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default",
    created_date timestamp without time zone,
    modified_date timestamp without time zone,
    finished_date timestamp without time zone,
    assigned text COLLATE pg_catalog."default",
    total_points integer,
    acceptance_criteria boolean,
    priority boolean,
    pattern boolean,
    is_closed boolean,
    reference integer,
    milestone_name text COLLATE pg_catalog."default",
    milestone_id text COLLATE pg_catalog."default",
    milestone_total_points integer,
    milestone_closed_points integer,
    milestone_created_date timestamp without time zone,
    milestone_modified_date timestamp without time zone,
    milestone_estimated_start timestamp without time zone,
    milestone_estimated_finish timestamp without time zone,
    milestone_closed boolean,
    CONSTRAINT userstories_pkey PRIMARY KEY (id)
)