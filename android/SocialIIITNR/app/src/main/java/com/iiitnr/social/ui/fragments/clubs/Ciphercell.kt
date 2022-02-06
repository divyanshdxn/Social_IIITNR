package com.iiitnr.social.ui.fragments.clubs

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.iiitnr.social.databinding.FragmentCiphercellBinding
import com.iiitnr.social.databinding.FragmentClubsBinding
import com.iiitnr.social.ui.fragments.BaseFragment

class Ciphercell : BaseFragment() {
    private var _binding: FragmentCiphercellBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCiphercellBinding.inflate(inflater, container, false)
        return binding.root
    }
}