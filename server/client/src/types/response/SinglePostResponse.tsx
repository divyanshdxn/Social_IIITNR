interface SinglePostResponse {
  postId: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
  profileUserId: string;
  media: string[];
  page: null;
}

export default SinglePostResponse;
