package com.iiitnr.social.data.post

data class PostResponseItem(
    val caption: String,
    val createdAt: String,
    val media: List<String>,
    val page: Any,
    val postId: String,
    val profileUserId: String,
    val updatedAt: String
)