import React from 'react';
import useApi from '../../hooks/useApi';
import PostByUserResponse from '../../types/response/PostsByUserResponse';
import SinglePostPrev from './SinglePostPrev';

interface Props {
  userID: string | null | undefined;
}

const PostList: React.FC<Props> = ({ userID }) => {
  const { isSuccess, isLoading, isError, data } = useApi<
    any,
    PostByUserResponse[]
  >(`/api/post/user/${userID}`, 'get');
  return (
    <div className=" w-full mt-6 flex-1 basis-1/3">
      <h2 className="text-lg ml-1">Your Posts</h2>
      <div
        className="flex flex-col justify-start gap-3 w-full h-full 
	  overflow-y-auto py-1 px-1"
      >
        {data?.map((item, index) => {
          return (
            <SinglePostPrev data={item} isLoading={isLoading} key={index} />
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
