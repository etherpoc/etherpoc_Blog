-- Add migration script here
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL,
    author INTEGER ,
    title TEXT NOT NULL,
    tags TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES blog_users(id)
);