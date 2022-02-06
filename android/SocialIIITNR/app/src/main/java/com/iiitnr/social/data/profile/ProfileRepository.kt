package com.iiitnr.social.data.profile

import android.util.Log
import com.iiitnr.social.common.Resource
import com.iiitnr.social.common.getBearerHeader
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException

class ProfileRepository(private val profileApi: ProfileApi) {

    fun getAll(idToken: String): Flow<Resource<List<Profile>>> = flow {
        try {
            emit(Resource.Loading())
            val profiles = profileApi.getAll(getBearerHeader(idToken))
            emit(Resource.Success(profiles))
        } catch (e: HttpException) {
            emit(Resource.Error(e.message()))
            Log.e(TAG, "getAll: ", e)
        }
    }

    companion object {
        private const val TAG = "PROFILE_REPOSITORY"
    }

}