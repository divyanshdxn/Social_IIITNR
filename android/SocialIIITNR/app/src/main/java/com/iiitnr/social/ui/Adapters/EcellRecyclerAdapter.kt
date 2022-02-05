package com.iiitnr.social.ui.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import com.iiitnr.social.R

class EcellRecyclerAdapter(private val items: ArrayList<Int>)  : RecyclerView.Adapter<ImageViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ImageViewHolder {
        val view =
            LayoutInflater.from(parent.context).inflate(R.layout.ecell_events_card, parent, false)
        return ImageViewHolder(view)
    }

    override fun onBindViewHolder(holder: ImageViewHolder, position: Int) {
        val currentItem= items[position]
        holder.image .setImageResource(currentItem)
    }

    override fun getItemCount(): Int {
        return items.size
    }

}
class ImageViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    var image : ImageView = itemView.findViewById(R.id.event_ecell)
}
