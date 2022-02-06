package com.iiitnr.social.ui.fragments.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.iiitnr.social.common.Resource
import com.iiitnr.social.data.post.Post
import com.iiitnr.social.data.post.PostRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import javax.inject.Inject

@ExperimentalCoroutinesApi
@HiltViewModel
class HomeViewModel
@Inject
constructor(private val postRepository: PostRepository) : ViewModel() {

    private val _posts = MutableLiveData<List<Post>>()
    val posts: LiveData<List<Post>> get() = _posts

    private val _loading = MutableLiveData<Boolean>(false)
    val isLoading: LiveData<Boolean> get() = _loading

    private val _error = MutableLiveData<String?>(null)
    val error: LiveData<String?> get() = _error


    fun loadPost(idToken: String) {
        viewModelScope.launch {
            postRepository.getAllPosts(idToken).collect { res ->
                when (res) {
                    is Resource.Loading -> {
                        _loading.value = true
                        _error.value = null
                    }
                    is Resource.Error -> {
                        _loading.value = false
                        _error.value = res.message
                    }
                    is Resource.Success -> {
                        _loading.value = false
                        _error.value = null
                        _posts.value = res.data!!
                    }
                }
            }
        }
    }

    fun <T> handleResource(resource: Resource<T>, data: MutableLiveData<T>) {
        when (resource) {
            is Resource.Loading -> {
                _loading.value = true
                _error.value = null
            }
            is Resource.Error -> {
                _loading.value = false
                _error.value = resource.message
            }
            is Resource.Success -> {
                _loading.value = false
                _error.value = null
                data.value = resource.data!!
            }
        }
    }

}