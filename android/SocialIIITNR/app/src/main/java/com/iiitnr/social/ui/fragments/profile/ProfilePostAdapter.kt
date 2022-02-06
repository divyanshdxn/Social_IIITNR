package com.iiitnr.social.ui.fragments.profile

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import coil.load
import com.iiitnr.social.R
import com.iiitnr.social.common.getMediaUrl
import com.iiitnr.social.data.post.Post

class ProfilePostAdapter : RecyclerView.Adapter<ProfilePostAdapter.ProfilePostViewHolder>() {

    private val posts = mutableListOf<Post>()

    fun loadData(posts: List<Post>) {
        this.posts.clear()
        this.posts.addAll(posts)
        notifyDataSetChanged()
    }

    inner class ProfilePostViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val postImageView: ImageView = itemView.findViewById(R.id.profile_post_image)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProfilePostViewHolder {
        return ProfilePostViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.profile_post_layout, parent, false)
        )
    }

    override fun onBindViewHolder(holder: ProfilePostViewHolder, position: Int) {
        holder.postImageView.load(getMediaUrl(posts[position].media[0]))
    }

    override fun getItemCount(): Int = posts.size
}