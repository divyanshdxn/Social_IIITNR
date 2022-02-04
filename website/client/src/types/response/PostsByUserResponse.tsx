interface PostByUserResponse {
  postId: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
  profileUserID: string;
  media: string[];
}

export default PostByUserResponse;
