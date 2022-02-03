package com.iiitnr.social.ui.fragments.home

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.iiitnr.social.R
import com.iiitnr.social.databinding.FragmentHomeBinding
import com.iiitnr.social.databinding.FragmentPostDetailBinding
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class Home : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }


}