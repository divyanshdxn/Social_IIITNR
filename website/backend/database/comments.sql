CREATE TABLE `post_comments` (
    `id` varchar NOT NULL,
    `comment` varchar,
    `post_id` varchar NOT NULL,
    `user_id` varchar,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`post_id`),
    FOREIGN KEY (`user_id`),
)