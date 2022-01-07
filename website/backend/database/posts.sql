CREATE TABLE `user_post` (
    `id` varchar NOT NULL,
    `photoUrl` varchar NOT NULL,
    `caption` varchar,
    `user_id` varchar
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`),
)
