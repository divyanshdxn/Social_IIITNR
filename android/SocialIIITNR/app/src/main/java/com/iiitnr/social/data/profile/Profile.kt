package com.iiitnr.social.data.profile

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Profile(
    val bio: String,
    val email: String,
    val firstName: String,
    val lastName: String,
    val photoUrl: String,
    val updatedAt: String,
    val userId: String
) : Parcelable