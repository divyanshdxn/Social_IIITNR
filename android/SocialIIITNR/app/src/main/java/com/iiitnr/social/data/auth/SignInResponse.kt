package com.iiitnr.social.data.auth

import android.os.Parcelable
import com.iiitnr.social.data.profile.Profile
import kotlinx.parcelize.Parcelize

@Parcelize
data class SignInResponse(
    val idToken: String,
    val profile: Profile
) : Parcelable