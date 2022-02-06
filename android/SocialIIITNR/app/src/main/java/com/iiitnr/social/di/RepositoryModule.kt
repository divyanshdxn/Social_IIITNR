package com.iiitnr.social.di

import com.iiitnr.social.data.post.PostApi
import com.iiitnr.social.data.post.PostRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object RepositoryModule {

    @Provides
    @Singleton
    fun providePostRepository(postApi: PostApi) = PostRepository(postApi)

}