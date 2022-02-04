import React from 'react';
import useApi from '../../hooks/useApi';
import SinglePostResponse from '../../types/response/SinglePostResponse';
import PostLoading from '../Loaders/PostLoading';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  post: SinglePostResponse;
}

const SinglePost: React.FC<Props> = ({ post }) => {
  const { isLoading, isSuccess, data } = useApi(
    `/api/profile/${post.profileUserId}`,
    'get',
  );
  console.log('Hello');

  return (
    <div
      className=" flex flex-col my-2 border-2 border-hints dark:border-d-hints 
      p-4 rounded-lg w-full"
    >
      {isLoading && PostLoading}
    </div>
  );
};
export default SinglePost;
