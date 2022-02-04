package com.iiitnr.social.ui.fragments.pages

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.iiitnr.social.databinding.FragmentTrainingnPlacementBinding

class TrainingnPlacement : Fragment() {
    private var _binding: FragmentTrainingnPlacementBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentTrainingnPlacementBinding.inflate(inflater, container, false)
        return binding.root
    }
}