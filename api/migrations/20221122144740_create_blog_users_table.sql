-- Add migration script here
CREATE TABLE IF NOT EXISTS blog_users (
    id SERIAL,
    user_name TEXT NOT NULL,
    user_email TEXT UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);