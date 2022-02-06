interface SinglePostResponse {
  postId: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
  profileUserId?: string;
  media: string[];
}

export default SinglePostResponse;
