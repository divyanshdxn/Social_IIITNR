package com.iiitnr.social.di

import com.google.gson.GsonBuilder
import com.iiitnr.social.data.auth.AuthApi
import com.iiitnr.social.common.Constants
import com.iiitnr.social.data.post.PostApi
import com.iiitnr.social.data.profile.ProfileApi
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton


@Module
@InstallIn(SingletonComponent::class)
object ApiModule {

    private fun <T> buildApi(clazz: Class<T>): T =
        Retrofit.Builder().baseUrl(Constants.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create(GsonBuilder().create()))
            .build()
            .create(clazz)

    @Provides
    @Singleton
    fun provideAuthApi(): AuthApi = buildApi(AuthApi::class.java)

    @Provides
    @Singleton
    fun providePostApi(): PostApi = buildApi(PostApi::class.java)

    @Provides
    @Singleton
    fun provideProfileApi(): ProfileApi = buildApi(ProfileApi::class.java)

}