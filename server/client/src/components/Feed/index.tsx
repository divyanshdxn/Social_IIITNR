import React from 'react';
import useApi from '../../hooks/useApi';
import SinglePostResponse from '../../types/response/SinglePostResponse';
import PostLoading from '../Loaders/PostLoading';
import NewPost from '../NewPost';
import SinglePost from '../post/SinglePost';

interface Props {}

const Feed: React.FC<Props> = () => {
  const { isSuccess,  isLoading, data } = useApi<
    any,
    SinglePostResponse[]
  >('/api/post', 'get');
  return (
    <div
      className="flex relative flex-col flex-1 top-12 translate-y-6 h-fit"
      style={{ minHeight: 'calc(100% - 5rem)' }}
    >
      <NewPost />
      {isLoading ? (
        <PostLoading />
      ) : (
        isSuccess &&
        data?.map((item, index) => {
          return <SinglePost post={item} key={index} />;
        })
      )}
    </div>
  );
};

export default Feed;
