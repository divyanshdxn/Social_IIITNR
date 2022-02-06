package com.iiitnr.social.ui.fragments.post

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.iiitnr.social.common.handleResource
import com.iiitnr.social.data.post.PostRepository
import com.iiitnr.social.ui.fragments.BaseViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import java.io.InputStream
import javax.inject.Inject


@HiltViewModel
class CreatePostViewModel
@Inject
constructor(
    private val postRepository: PostRepository
) : BaseViewModel() {

    private val _success = MutableLiveData(false)
    val success: LiveData<Boolean> get() = _success

    fun createPost(inputStream: InputStream, filename: String, caption: String, idToken: String) {
        viewModelScope.launch {
            postRepository.createPost(idToken, inputStream, caption).collect {
                handleResource(it, _loading, _error, _success)
            }
        }
    }
}