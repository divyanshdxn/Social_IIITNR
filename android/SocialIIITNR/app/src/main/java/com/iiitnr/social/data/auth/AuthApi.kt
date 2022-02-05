package com.iiitnr.social.data.auth

import retrofit2.http.GET
import retrofit2.http.Header

interface AuthApi {

    @GET("api/auth/signin")
    suspend fun signIn(@Header("Authorization") idToken: String): SignInResponse

}