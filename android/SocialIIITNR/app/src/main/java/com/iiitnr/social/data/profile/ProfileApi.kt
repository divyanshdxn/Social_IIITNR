package com.iiitnr.social.data.profile

import retrofit2.http.GET
import retrofit2.http.Header

interface ProfileApi {

    @GET("/api/profile")
    suspend fun getAll(@Header("Authorization") authorization: String) : List<Profile>

}