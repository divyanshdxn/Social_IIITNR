package com.iiitnr.social.ui.fragments.profile

import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.hilt.navigation.fragment.hiltNavGraphViewModels
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import coil.load
import com.iiitnr.social.R
import com.iiitnr.social.databinding.FragmentProfileBinding
import com.iiitnr.social.ui.SignInActivity
import com.iiitnr.social.ui.fragments.BaseFragment

class Profile : BaseFragment() {

    private val viewModel by hiltNavGraphViewModels<ProfileViewModel>(R.id.nav_graph)

    private lateinit var profilePostAdapter: ProfilePostAdapter

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        mainActivity.hideNavBar()
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initUi()
        observeData()
    }


    private fun initUi() {
        profilePostAdapter = ProfilePostAdapter()
        val profile = mainActivity.signInResponse.profile
        viewModel.loadData(mainActivity.signInResponse.idToken, profile.userId)
        binding.profilePhoto.load(profile.photoUrl)
        binding.userName.text = "${profile.firstName} ${profile.lastName}"
        binding.email.text = "${profile.email}"
        binding.signOut.setOnClickListener {
            AlertDialog.Builder(requireContext()).apply {
                setTitle("Sign Out?")
                setPositiveButton("Yes") { dialog, _ ->
                    mainActivity.mGoogleSignInClient.revokeAccess()
                    mainActivity.mGoogleSignInClient.signOut()
                    startActivity(Intent(mainActivity, SignInActivity::class.java))
                    dialog.dismiss()
                }
                setNegativeButton("No") { dialog, id ->
                    dialog.cancel()
                }
                setCancelable(false)
            }.create().show()
        }
        binding.profilePostRecycler.layoutManager =
            GridLayoutManager(requireContext(), 2, LinearLayoutManager.VERTICAL, false)
        binding.profilePostRecycler.adapter = profilePostAdapter
    }

    private fun observeData() {
        viewModel.posts.observe(viewLifecycleOwner) {
            profilePostAdapter.loadData(it)
        }
        viewModel.isLoading.observe(viewLifecycleOwner) { isLoading ->
            binding.profilePostLoading.visibility = if (isLoading) View.VISIBLE else View.GONE
        }
        viewModel.error.observe(viewLifecycleOwner) {
            Log.e(TAG, "observeData: $it", )
        }
    }


    override fun onDetach() {
        super.onDetach()
        mainActivity.showNavBar()
    }

    companion object {
        private const val TAG = "PROFILE_FRAGMENT"
    }
}