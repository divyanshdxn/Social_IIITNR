package com.iiitnr.social.common;

import android.app.Activity
import android.content.Context
import android.widget.Toast
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import java.text.SimpleDateFormat
import java.util.*

fun Context.shortToast(message: String) {
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}

fun Date.toDateString(): String {
    val formatter = SimpleDateFormat("HH:mm dd-MMM");
    return formatter.format(this)
}


fun Activity.getGoogleSignInClient(activity: Activity) = GoogleSignIn.getClient(
    this, GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
        .requestIdToken("557790709288-4la84pac5ktcasmjtdfa40312pgk5nnj.apps.googleusercontent.com")
        .requestEmail()
        .build()
)