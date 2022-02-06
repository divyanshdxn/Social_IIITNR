package com.iiitnr.social.ui.fragments.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.hilt.navigation.fragment.hiltNavGraphViewModels
import androidx.recyclerview.widget.LinearLayoutManager
import coil.load
import com.iiitnr.social.R
import com.iiitnr.social.databinding.FragmentHomeBinding
import com.iiitnr.social.ui.fragments.BaseFragment
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.ExperimentalCoroutinesApi


@AndroidEntryPoint
@ExperimentalCoroutinesApi
class Home : BaseFragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    private val viewModel: HomeViewModel by hiltNavGraphViewModels(R.id.nav_graph)

    private lateinit var postsRecyclerAdapter: PostsRecyclerAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupUI()
        observeData()
        viewModel.loadData(mainActivity.signInResponse.idToken)
    }

    private fun setupUI() {
        postsRecyclerAdapter = PostsRecyclerAdapter()
        binding.textGreeting.text = "Hello ${mainActivity.signInResponse.profile.firstName}"
        binding.profilePhoto.load(mainActivity.signInResponse.profile.photoUrl)
        binding.postRecyclerView.layoutManager =
            LinearLayoutManager(requireContext(), LinearLayoutManager.VERTICAL, false)
        binding.postRecyclerView.adapter = postsRecyclerAdapter
    }

    private fun observeData() {
        viewModel.posts.observe(viewLifecycleOwner) {
            postsRecyclerAdapter.loadData(it)
        }
        viewModel.isLoading.observe(viewLifecycleOwner) { isLoading ->
            binding.postLoading.visibility = if (isLoading) View.VISIBLE else View.GONE
        }
    }

    companion object {
        private const val TAG = "HOME_FRAGMENT"
    }

}