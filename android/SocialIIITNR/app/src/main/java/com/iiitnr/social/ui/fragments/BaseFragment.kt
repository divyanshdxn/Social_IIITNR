package com.iiitnr.social.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.iiitnr.social.ui.MainActivity

open class BaseFragment : Fragment() {
    private var _mainActivity: MainActivity? = null
    val mainActivity: MainActivity get() = _mainActivity!!
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _mainActivity = activity as MainActivity
    }

}