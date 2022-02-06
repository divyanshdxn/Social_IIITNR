package com.iiitnr.social.ui.fragments.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.iiitnr.social.common.Resource
import com.iiitnr.social.data.post.Post
import com.iiitnr.social.data.post.PostDto
import com.iiitnr.social.data.post.PostRepository
import com.iiitnr.social.data.profile.Profile
import com.iiitnr.social.data.profile.ProfileRepository
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
    private val profileRepository: ProfileRepository
) : ViewModel() {

    private lateinit var idToken: String

    private val _posts = MutableLiveData<List<Post>>()
    val posts: LiveData<List<Post>> get() = _posts

    private val _users = MutableLiveData<List<Profile>>()
    val users: LiveData<List<Profile>> get() = _users

    private val _usersMap = MutableLiveData<Map<String, Profile>>()
    val usersMap: LiveData<Map<String, Profile>> get() = _usersMap

    private val _loading = MutableLiveData<Boolean>(false)
    val isLoading: LiveData<Boolean> get() = _loading

    private val _error = MutableLiveData<String?>(null)
    val error: LiveData<String?> get() = _error

    fun loadData(idToken: String) {
        this.idToken = idToken
        loadPost()
    }

    private fun loadPost() {
        viewModelScope.launch {
            postRepository.getAllPosts(idToken).collect { res ->
                handleResource(res, _posts)
            }
        }
    }

    private fun loadUsers() {
        viewModelScope.launch {
            profileRepository.getAll(idToken).collect { res ->
                handleResource(res, _users)
                _usersMap.value = _users.value?.map { it.userId to it }?.toMap()
            }
        }
    }

    private fun <T> handleResource(resource: Resource<T>, data: MutableLiveData<T>) {
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