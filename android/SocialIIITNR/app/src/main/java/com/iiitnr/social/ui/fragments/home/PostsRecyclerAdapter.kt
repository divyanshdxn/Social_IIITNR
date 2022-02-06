package com.iiitnr.social.ui.fragments.home

import android.media.Image
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import coil.load
import com.iiitnr.social.R
import com.iiitnr.social.common.Constants
import com.iiitnr.social.data.post.Post

class PostsRecyclerAdapter() :
    RecyclerView.Adapter<PostsRecyclerAdapter.PostViewHolder>() {

    val posts = mutableListOf<Post>()
    fun loadData(posts: List<Post>) {
        this.posts.clear()
        this.posts.addAll(posts)
        notifyDataSetChanged()
    }

    inner class PostViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val profilePhoto: ImageView = itemView.findViewById(R.id.profile_photo)
        val userName: TextView = itemView.findViewById(R.id.user_name)
        val postTimeStamp: TextView = itemView.findViewById(R.id.post_timestamp)
        val options: ImageButton = itemView.findViewById(R.id.options)
        val captions: TextView = itemView.findViewById(R.id.captions)
        val postImage: ImageView = itemView.findViewById(R.id.post_image)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostViewHolder =
        PostViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.layout_post_card, parent, false)
        )

    override fun onBindViewHolder(holder: PostViewHolder, position: Int) {
        val post = posts[position]
        holder.apply {
            postImage.load("${Constants.BASE_URL}api/media/${post.media[0]}")
            captions.text = post.caption
            postTimeStamp.text = post.updatedAt
        }
    }

    override fun getItemCount(): Int = posts.size
}