package com.iiitnr.social.common

import java.text.DateFormatSymbols

fun getBearerHeader(token: String) = "bearer $token"

fun getFormattedTime(time: String): String {
    val yyyy = time.substring(0, 4);
    val MM = time.substring(5, 7).toInt();
    val dd = time.substring(8, 10);
    val hh = time.substring(11, 13);
    val mm = time.substring(14, 16);
    val ss = time.substring(18, 20);
    return "$hh:$mm, $dd ${DateFormatSymbols().months[MM - 1]}"
}