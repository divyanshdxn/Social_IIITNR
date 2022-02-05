package com.iiitnr.social.ui.fragments.pages

import android.graphics.drawable.Drawable
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.iiitnr.social.R
import com.iiitnr.social.databinding.FragmentEcellBinding
import com.iiitnr.social.databinding.FragmentTrainingnPlacementBinding
import com.iiitnr.social.ui.Adapters.EcellRecyclerAdapter
import com.iiitnr.social.ui.Adapters.ImageViewHolder

class Ecell : Fragment() {
    private var layoutManager: RecyclerView.LayoutManager? = null
    private var adapter: RecyclerView.Adapter<ImageViewHolder>? = null
    private var _binding: FragmentEcellBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentEcellBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val items : ArrayList<Int> = ArrayList()
        items.add(R.drawable.bigbull)
        items.add(R.drawable.index)
        items.add(R.drawable.esummit)
        items.add(R.drawable.case_study_competition1)
        binding.ongoingEcellList.apply {
            // set a LinearLayoutManager to handle Android
            // RecyclerView behavior
            layoutManager = LinearLayoutManager(activity)
            // set the custom adapter to the RecyclerView
            adapter = EcellRecyclerAdapter(items)
        }
    }
}