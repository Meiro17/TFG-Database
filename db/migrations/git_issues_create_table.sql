CREATE TABLE IF NOT EXISTS git_issues
(
    id integer NOT NULL DEFAULT nextval('git_issues_id_seq'::regclass),
    url text COLLATE pg_catalog."default",
    html_url text COLLATE pg_catalog."default",
    "number" text COLLATE pg_catalog."default",
    title text COLLATE pg_catalog."default",
    user_id integer,
    assignee_id integer,
    body text COLLATE pg_catalog."default",
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    closed_at timestamp with time zone,
    state text COLLATE pg_catalog."default",
    labels text[] COLLATE pg_catalog."default",
    CONSTRAINT git_issues_pkey PRIMARY KEY (id),
    CONSTRAINT git_issues_assignee_id_fkey FOREIGN KEY (assignee_id)
        REFERENCES public.assignees (assignee_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT git_issues_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)