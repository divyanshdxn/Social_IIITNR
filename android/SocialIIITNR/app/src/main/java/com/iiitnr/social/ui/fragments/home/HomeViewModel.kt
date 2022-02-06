package com.iiitnr.social.ui.fragments.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.iiitnr.social.common.handleResource
import com.iiitnr.social.data.post.Post
import com.iiitnr.social.data.post.PostRepository
import com.iiitnr.social.ui.fragments.BaseViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import javax.inject.Inject

@ExperimentalCoroutinesApi
@HiltViewModel
class HomeViewModel
@Inject
constructor(
    private val postRepository: PostRepository,
) : BaseViewModel() {

    private lateinit var idToken: String

    private val _posts = MutableLiveData<List<Post>>()
    val posts: LiveData<List<Post>> get() = _posts



    fun loadData(idToken: String) {
        this.idToken = idToken
        loadPost()
    }

    private fun loadPost() {
        viewModelScope.launch {
            postRepository.getAllPosts(idToken).collect { res ->
                handleResource(res, _loading, _error, _posts)
            }
        }
    }

}