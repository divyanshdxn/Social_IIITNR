CREATE TABLE IF NOT EXISTS user_post (
    post_id varchar NOT NULL PRIMARY KEY,
    photo_url varchar NOT NULL,
    caption varchar,
    user_id varchar NOT NULL,
    CONSTRAINT fk_customer FOREIGN KEY(user_id) REFERENCES user_profile(user_id)
);


