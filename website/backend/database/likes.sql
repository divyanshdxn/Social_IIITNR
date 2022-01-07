CREATE TABLE `post_likes` (
    `id` varchar NOT NULL,
    `post_id` varchar NOT NULL,
    `user_id` varchar
    PRIMARY KEY (`id`),
    FOREIGN KEY (`post_id`),
    FOREIGN KEY (`user_id`),
)