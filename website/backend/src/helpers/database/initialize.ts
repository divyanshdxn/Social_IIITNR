import { dbClient } from "./connection"

const createUserTable = `
CREATE TABLE IF NOT EXISTS user_profile (
    user_id varchar NOT NULL PRIMARY KEY,
    email varchar NOT NULL UNIQUE,
    password_hash varchar NOT NULL,
    first_name varchar NOT NULL,
    last_name varchar,
    photo_url varchar
);

`

const createPostTable = `
CREATE TABLE IF NOT EXISTS user_post (
    post_id varchar NOT NULL PRIMARY KEY,
    photo_url varchar NOT NULL,
    caption varchar,
    user_id varchar NOT NULL,
    CONSTRAINT fk_customer FOREIGN KEY(user_id) REFERENCES user_profile(user_id)
);
`

const createCommentsTable = `
CREATE TABLE IF NOT EXISTS post_comments (
    comment_id varchar NOT NULL PRIMARY KEY,
    comment varchar,
    post_id varchar NOT NULL,
    user_id varchar NOT NULL,
    CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES user_post(post_id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES user_profile(user_id)
);
`

const createLikesTable=`
CREATE TABLE IF NOT EXISTS post_likes (
    like_id varchar NOT NULL PRIMARY KEY,
    post_id varchar NOT NULL,
    user_id varchar NOT NULL,
    CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES user_post(post_id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES user_profile(user_id)
);
`



export const initDB = async () => {
    await dbClient.query(`
    ${createUserTable}
    ${createPostTable}
    ${createCommentsTable}
    ${createLikesTable}
    `)
}

