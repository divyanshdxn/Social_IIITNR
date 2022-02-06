package com.iiitnr.social.data.post

import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path

interface PostApi {

    @GET("/api/post")
    suspend fun getAllPost(@Header("Authorization") bearerToken: String): List<Post>

    @GET("/api/post/{postId}")
    suspend fun getPostById(
        @Header("Authorization") bearerToken: String,
        @Path("postId") postId: String
    ): Post

}