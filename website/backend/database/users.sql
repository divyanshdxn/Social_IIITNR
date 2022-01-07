CREATE TABLE user_profile (
    uuid varchar NOT NULL,
    email varchar NOT NULL UNIQUE,
    password_hash varchar NOT NULL,
    first_name varchar NOT NULL,
    last_name varchar,
    photo_url varchar,
    PRIMARY KEY (uuid)
);
