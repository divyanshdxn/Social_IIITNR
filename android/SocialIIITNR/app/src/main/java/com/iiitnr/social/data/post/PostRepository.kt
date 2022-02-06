package com.iiitnr.social.data.post

import kotlinx.coroutines.flow.callbackFlow
import com.iiitnr.social.common.Resource
import com.iiitnr.social.common.getBearerHeader
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException

class PostRepository(private val postApi: PostApi) {
    @ExperimentalCoroutinesApi
    fun getAllPosts(idToken: String) = flow<Resource<List<Post>>> {
        try {
            emit(Resource.Loading())
            val posts = postApi.getAllPost(getBearerHeader(idToken))
            emit(Resource.Success(posts))
        } catch (exception: HttpException) {
            emit(Resource.Error(exception.message()))
        }

    }
}