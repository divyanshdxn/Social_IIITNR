package com.iiitnr.social.ui.fragments.home

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
import com.iiitnr.social.common.getFormattedTime
import com.iiitnr.social.data.post.Post
import com.iiitnr.social.data.post.PostDto
import com.iiitnr.social.data.profile.Profile

class PostsRecyclerAdapter :
    RecyclerView.Adapter<PostsRecyclerAdapter.PostViewHolder>() {

    private val posts = mutableListOf<Post>()
    private val usersMap = mutableMapOf<String, Profile>()

    fun loadData(post: List<Post>? = null, usersMap: Map<String, Profile>? = null) {
        post?.let {
            this.posts.clear()
            this.posts.addAll(post)
            notifyDataSetChanged()
        }
        usersMap?.let {
            this.usersMap.clear()
            this.usersMap.putAll(usersMap)
            notifyDataSetChanged()
        }

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
            postTimeStamp.text = getFormattedTime(post.updatedAt)
            userName.text = post.userName
            profilePhoto.load(post.profilePhoto)
        }
    }

    override fun getItemCount(): Int = posts.size
}