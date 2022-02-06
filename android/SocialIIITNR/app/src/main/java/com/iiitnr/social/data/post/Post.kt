package com.iiitnr.social.data.post

data class PostDto(
    val caption: String,
    val createdAt: String,
    val media: List<String>,
    val page: Any,
    val postId: String,
    val profileUserId: String,
    val updatedAt: String
)

data class Post(
    val caption: String,
    val media: List<String>,
    val updatedAt: String,
    val userName: String,
    val profilePhoto: String
)