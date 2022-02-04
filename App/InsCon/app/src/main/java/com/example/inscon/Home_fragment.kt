package com.example.inscon

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController

class Home_fragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home, container, false)
    }
    override fun onStart() {
        super.onStart()
        findNavController().navigate(R.id.action_homeFragment_to_logInFragment)
        // if not Authorized then pass to login frag
//        if (auth.currentUser == null) {
//            findNavController().navigate(R.id.action_homeFragment_to_logInFragment)
//        }
    }
}