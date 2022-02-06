package com.iiitnr.social.ui.fragments.post

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.iiitnr.social.databinding.FragmentPostDetailBinding
import com.iiitnr.social.ui.fragments.BaseFragment
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class PostDetail : BaseFragment() {

    private var _binding: FragmentPostDetailBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentPostDetailBinding.inflate(inflater, container, false)
        return binding.root
    }


}