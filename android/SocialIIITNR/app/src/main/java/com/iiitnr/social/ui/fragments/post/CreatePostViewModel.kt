package com.iiitnr.social.ui.fragments.post

import android.content.Context
import android.net.Uri
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.iiitnr.social.common.Resource
import com.iiitnr.social.data.post.PostRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import java.io.InputStream
import javax.inject.Inject


@HiltViewModel
class CreatePostViewModel
@Inject
constructor(
    private val postRepository: PostRepository
) : ViewModel() {

    private val _loading = MutableLiveData(false)
    val isLoading: LiveData<Boolean> get() = _loading

    private val _error = MutableLiveData<String?>(null)
    val error: LiveData<String?> get() = _error

    private val _success = MutableLiveData(false)
    val success: LiveData<Boolean> get() = _success


    fun createPost(inputStream: InputStream, caption: String, idToken: String) {
        viewModelScope.launch {
            val part = MultipartBody.Part.createFormData(
                "pic", "myPic", RequestBody.create(
                    MediaType.parse("image/*"),
                    inputStream.readBytes()
                )
            )
            postRepository.createPost(idToken, part, caption).collect {
                when (it) {
                    is Resource.Loading -> {
                        _loading.value = true
                        _error.value = null
                    }
                    is Resource.Error -> {
                        _loading.value = false
                        _error.value = it.message
                    }
                    is Resource.Success -> {
                        _loading.value = false
                        _error.value = null
                        _success.value = true
                    }
                }
            }
        }

    }

}