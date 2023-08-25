CREATE TABLE IF NOT EXISTS commits
(
    commit_id integer NOT NULL DEFAULT nextval('commits_commit_id_seq'::regclass),
    sha text COLLATE pg_catalog."default",
    url text COLLATE pg_catalog."default",
    user_id integer,
    repository text COLLATE pg_catalog."default",
    date timestamp with time zone,
    message text COLLATE pg_catalog."default",
    message_char_count smallint,
    message_word_count smallint,
    task_is_written boolean,
    task_reference text COLLATE pg_catalog."default",
    task_id integer,
    verified text COLLATE pg_catalog."default",
    verified_reason text COLLATE pg_catalog."default",
    stats_additions integer,
    stats_deletions integer,
    stats_total integer,
    CONSTRAINT commits_pkey PRIMARY KEY (commit_id),
    CONSTRAINT commits_task_id_fkey FOREIGN KEY (task_id)
        REFERENCES public.tasks (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT commits_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)