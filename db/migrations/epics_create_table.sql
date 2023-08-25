CREATE TABLE IF NOT EXISTS epics
(
    id text COLLATE pg_catalog."default" NOT NULL,
    subject text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default",
    created_date timestamp without time zone,
    modified_date timestamp without time zone,
    progress double precision,
    total double precision,
    is_closed boolean,
    CONSTRAINT epics_pkey PRIMARY KEY (id)
)