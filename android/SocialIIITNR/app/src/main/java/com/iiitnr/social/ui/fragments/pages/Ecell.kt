package com.iiitnr.social.ui.fragments.pages

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.iiitnr.social.databinding.FragmentEcellBinding
import com.iiitnr.social.databinding.FragmentTrainingnPlacementBinding

class Ecell : Fragment() {
    private var _binding: FragmentEcellBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentEcellBinding.inflate(inflater, container, false)
        return binding.root
    }
}