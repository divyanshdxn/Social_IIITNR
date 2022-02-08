package com.iiitnr.social.data.post

import android.util.Log
import com.iiitnr.social.common.Resource
import com.iiitnr.social.common.getBearerHeader
import com.iiitnr.social.data.profile.ProfileApi
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.flow
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.HttpException
import java.io.InputStream

class PostRepository(
    private val postApi: PostApi,
    private val profileApi: ProfileApi
) {
    @ExperimentalCoroutinesApi
    fun getAllPosts(idToken: String) = flow<Resource<List<Post>>> {
        try {
            emit(Resource.Loading())
            val postDtos = postApi.getAllPost(getBearerHeader(idToken))
            val profiles = profileApi.getAll(getBearerHeader(idToken))
            val posts = postDtos.map { postDto ->
                val profile = profiles.filter { it.userId == postDto.profileUserId }[0]
                Post(
                    postDto.caption,
                    postDto.media,
                    postDto.updatedAt,
                    "${profile.firstName} ${profile.lastName}",
                    profile.photoUrl
                )
            }
            emit(Resource.Success(posts))
        } catch (exception: HttpException) {
            Log.e(TAG, "getAllPosts: ", exception)
            emit(Resource.Error(exception.message()))
        }
    }

    fun createPost(idToken: String, file: InputStream, caption: String) = flow<Resource<Boolean>> {
        try {
            emit(Resource.Loading())
            val filePart = MultipartBody.Part.createFormData(
                "file", "filename", RequestBody.create(
                    MediaType.parse("image/*"),
                    file.readBytes()
                )
            )
            val captionPart = MultipartBody.Part.createFormData("caption", caption)
            postApi.create(getBearerHeader(idToken), filePart, captionPart)
            emit(Resource.Success(true))
        } catch (e: HttpException) {
            Log.e(TAG, "createPost: ", e)
            emit(Resource.Error(e.message()))
        }
    }

    fun getPostByUserId(idToken: String, userId: String) = flow<Resource<List<Post>>> {
        try {
            emit(Resource.Loading())
            val posts = postApi.getPostByUserId(getBearerHeader(idToken), userId).map { postDto ->
                Post(
                    postDto.caption,
                    postDto.media,
                    postDto.updatedAt,
                    "",
                    ""
                )
            }
            emit(Resource.Success(posts))
        } catch (e: HttpException) {
            Log.e(TAG, "getPostByUserId: ", e)
            emit(Resource.Error(e.message()))
        }
    }

    companion object {
        private const val TAG = "POST_REPOSITORY"
    }
}