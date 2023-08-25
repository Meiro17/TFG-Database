CREATE TABLE IF NOT EXISTS users
(
    user_id integer NOT NULL,
    login character varying(255) COLLATE pg_catalog."default",
    url character varying(255) COLLATE pg_catalog."default",
    type text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)