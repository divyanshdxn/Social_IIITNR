package com.iiitnr.social.ui.fragments.profile

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.iiitnr.social.common.handleResource
import com.iiitnr.social.data.post.Post
import com.iiitnr.social.data.post.PostRepository
import com.iiitnr.social.ui.fragments.BaseViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel
@Inject
constructor(private val postRepository: PostRepository) : BaseViewModel() {

    private val _posts = MutableLiveData<List<Post>>()
    val posts: LiveData<List<Post>> = _posts

    fun loadData(idToken: String, userId: String) {
        viewModelScope.launch {
            postRepository.getPostByUserId(idToken, userId).collect { resource ->
                handleResource(resource, _loading, _error, _posts)
            }
        }
    }

}