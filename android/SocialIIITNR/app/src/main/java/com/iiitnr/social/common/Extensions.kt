package com.iiitnr.social.common;

import android.content.Context
import android.widget.Toast
import java.text.SimpleDateFormat
import java.util.*

fun Context.shortToast(message: String) {
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}

fun Date.toDateString(): String {
    val formatter = SimpleDateFormat("HH:mm dd-MMM");
    return formatter.format(this)
}
