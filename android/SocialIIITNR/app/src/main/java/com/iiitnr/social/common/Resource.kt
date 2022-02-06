package com.iiitnr.social.common

import android.util.Log
import androidx.lifecycle.MutableLiveData

sealed class Resource<T>(
    val data: T? = null,
    val message: String? = null
) {
    class Success<T>(data: T) : Resource<T>(data)
    class Error<T>(message: String?, data: T? = null) : Resource<T>(data, message)
    class Loading<T> : Resource<T>()
}

 fun <T> handleResource(
    resource: Resource<T>,
    loading: MutableLiveData<Boolean>,
    error: MutableLiveData<String?>,
    data: MutableLiveData<T>
) {
    when (resource) {
        is Resource.Loading -> {
            loading.value = true
            error.value = null
        }
        is Resource.Error -> {
            loading.value = false
            error.value = resource.message
        }
        is Resource.Success -> {
            loading.value = false
            error.value = null
            data.value = resource.data!!
        }
    }
}