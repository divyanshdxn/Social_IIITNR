CREATE TABLE IF NOT EXISTS user_profile (
    user_id varchar NOT NULL PRIMARY KEY,
    email varchar NOT NULL UNIQUE,
    password_hash varchar NOT NULL,
    first_name varchar NOT NULL,
    last_name varchar,
    photo_url varchar
);
