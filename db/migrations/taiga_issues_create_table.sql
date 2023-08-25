CREATE TABLE IF NOT EXISTS taiga_issues
(
    id text COLLATE pg_catalog."default" NOT NULL,
    subject text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    severity text COLLATE pg_catalog."default",
    priority text COLLATE pg_catalog."default",
    type text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default",
    created_date timestamp without time zone,
    modified_date timestamp without time zone,
    finished_date timestamp without time zone,
    assigned text COLLATE pg_catalog."default",
    is_closed boolean,
    CONSTRAINT taiga_issues_pkey PRIMARY KEY (id)
)