package com.iiitnr.social.ui.fragments.post

import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.result.contract.ActivityResultContracts
import androidx.hilt.navigation.fragment.hiltNavGraphViewModels
import coil.load
import com.iiitnr.social.R
import com.iiitnr.social.common.shortToast
import com.iiitnr.social.databinding.FragmentCreatePostBinding
import com.iiitnr.social.ui.fragments.BaseFragment
import dagger.hilt.android.AndroidEntryPoint
import java.io.InputStream


@AndroidEntryPoint
class CreatePost : BaseFragment() {

    private var _binding: FragmentCreatePostBinding? = null
    private val binding get() = _binding!!

    private val viewModel by hiltNavGraphViewModels<CreatePostViewModel>(R.id.nav_graph)
    private var imageInputStream: InputStream? = null
    private var name: String? = null

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
                val contentResolver = mainActivity.contentResolver
                if (uri != null) {
                    contentResolver.query(uri, null, null, null, null)?.use { cursor ->
                        val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                        val sizeIndex = cursor.getColumnIndex(OpenableColumns.SIZE)
                        cursor.moveToFirst()
                        name = cursor.getString(nameIndex)
                        val size = cursor.getLong(sizeIndex)
                        if (size < 1000000) {
                            imageInputStream = contentResolver.openInputStream(uri)
                            binding.postImage.load(uri)
                            binding.postImage.visibility = View.VISIBLE
                        } else {
                            mainActivity.shortToast("File size exceeded: max-size 1MB")
                        }
                    }
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
                    name!!,
                    caption,
                    mainActivity.signInResponse.idToken
                )
            } else {
                mainActivity.shortToast("Please select an image!")
            }
        }

        viewModel.success.observe(viewLifecycleOwner)
        { success ->
            if (success) {
                imageInputStream = null
                binding.postImage.visibility = View.GONE
                binding.caption.text.clear()
                binding.postImage.setImageResource(R.drawable.iiitnr)
                mainActivity.shortToast("Post created successfully!")
            }
        }

        viewModel.error.observe(viewLifecycleOwner)
        { error ->
            error?.let {
                mainActivity.shortToast(error)
            }
        }

        viewModel.isLoading.observe(viewLifecycleOwner)
        { isLoading ->
            binding.postingProgress.visibility = if (isLoading) View.VISIBLE else View.GONE
        }
    }


    companion object {
        private const val TAG = "CREATE_POST"
    }

}