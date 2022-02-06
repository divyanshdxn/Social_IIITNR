package com.iiitnr.social.ui.fragments.clubs

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.iiitnr.social.R
import com.iiitnr.social.databinding.FragmentClubsBinding
import com.iiitnr.social.databinding.FragmentEcellBinding
import com.iiitnr.social.ui.fragments.BaseFragment
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class Clubs : BaseFragment() {
    private var _binding: FragmentClubsBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentClubsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.ciphercell.setOnClickListener{
            findNavController().navigate(R.id.action_clubs_to_ciphercell)
        }
        binding.comet.setOnClickListener{
            findNavController().navigate(R.id.action_clubs_to_comet)
        }
        binding.inquizitive.setOnClickListener{
            findNavController().navigate(R.id.action_clubs_to_inquizitive)
        }
    }
}