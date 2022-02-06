package com.iiitnr.social.ui.fragments.post

import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.result.contract.ActivityResultContracts
import androidx.hilt.navigation.fragment.hiltNavGraphViewModels
import androidx.lifecycle.lifecycleScope
import androidx.navigation.navGraphViewModels
import coil.load
import com.iiitnr.social.R
import com.iiitnr.social.common.shortToast
import com.iiitnr.social.databinding.FragmentCreatePostBinding
import com.iiitnr.social.databinding.FragmentPostDetailBinding
import com.iiitnr.social.ui.fragments.BaseFragment
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileOutputStream
import java.io.InputStream
import java.io.OutputStream


@AndroidEntryPoint
class CreatePost : BaseFragment() {

    private var _binding: FragmentCreatePostBinding? = null
    private val binding get() = _binding!!

    private val viewModel by hiltNavGraphViewModels<CreatePostViewModel>(R.id.nav_graph)
    private var imageInputStream: InputStream? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCreatePostBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val getContent =
            registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
                uri?.let {
                    imageInputStream = mainActivity.contentResolver.openInputStream(it)
                    binding.postImage.load(uri)
                }
            }

        binding.addImage.setOnClickListener {
            getContent.launch("image/*")
        }

        binding.postBtn.setOnClickListener {
            val caption = binding.caption.text.toString()
            if (imageInputStream != null) {
                viewModel.createPost(
                    imageInputStream!!,
                    "IMG00${System.currentTimeMillis()}",
                    caption,
                    mainActivity.signInResponse.idToken
                )
            } else {
                mainActivity.shortToast("Please select an image!")
            }
        }

        viewModel.success.observe(viewLifecycleOwner) { success ->
            if (success) {
                binding.caption.text.clear()
                binding.postImage.setImageResource(R.drawable.iiitnr)
                mainActivity.shortToast("Post created successfully!")
            }
        }

        viewModel.error.observe(viewLifecycleOwner) { error ->
            error?.let {
                mainActivity.shortToast(error)
            }
        }

        viewModel.isLoading.observe(viewLifecycleOwner) { isLoading ->
            binding.postingProgress.visibility = if (isLoading) View.VISIBLE else View.GONE
        }
    }


    companion object {
        private const val TAG = "CREATE_POST"
    }

}