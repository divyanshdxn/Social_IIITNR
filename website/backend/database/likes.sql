CREATE TABLE IF NOT EXISTS post_likes (
    like_id varchar NOT NULL PRIMARY KEY,
    post_id varchar NOT NULL,
    user_id varchar NOT NULL,
    CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES user_post(post_id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES user_profile(user_id)
);
