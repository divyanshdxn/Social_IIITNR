package com.iiitnr.social.ui.fragments.home

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.iiitnr.social.R
import com.iiitnr.social.databinding.FragmentHomeBinding
import com.iiitnr.social.databinding.FragmentPostDetailBinding
import com.iiitnr.social.ui.MainActivity
import com.iiitnr.social.ui.fragments.BaseFragment
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class Home : BaseFragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.text.text = mainActivity.signInResponse.profile.firstName

    }


}