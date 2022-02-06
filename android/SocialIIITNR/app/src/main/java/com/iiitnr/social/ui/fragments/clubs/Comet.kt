package com.iiitnr.social.ui.fragments.clubs

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.iiitnr.social.databinding.FragmentClubsBinding
import com.iiitnr.social.databinding.FragmentCometBinding
import com.iiitnr.social.ui.fragments.BaseFragment

class Comet : BaseFragment() {
    private var _binding: FragmentCometBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCometBinding.inflate(inflater, container, false)
        return binding.root
    }
}