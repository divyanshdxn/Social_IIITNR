package com.iiitnr.social.data.post

import okhttp3.MultipartBody
import retrofit2.http.*

interface PostApi {

    @GET("/api/post")
    suspend fun getAllPost(@Header("Authorization") bearerToken: String): List<PostDto>

    @GET("/api/post/{postId}")
    suspend fun getById(
        @Header("Authorization") bearerToken: String,
        @Path("postId") postId: String
    ): PostDto

    @Multipart
    @POST("/api/post/create")
    suspend fun create(
        @Header("Authorization") bearerToken: String,
        @Part() file: MultipartBody.Part,
        @Part() caption: MultipartBody.Part
    )

    @GET("/api/post/user/{userId}")
    suspend fun getPostByUserId(
        @Header("Authorization") bearerToken: String,
        @Path("userId") userId: String
    ): List<PostDto>

}