import React, { useEffect } from 'react';
import PostByUserResponse from '../../types/response/PostsByUserResponse';

interface Props {
  data: PostByUserResponse;
  isLoading?: boolean;
}
const SinglePostPrev: React.FC<Props> = ({ data, isLoading }) => {
  useEffect(() => {}, [isLoading]);
  if (isLoading) return <span>Loading...</span>;
  return (
    <div
      className="flex w-full h-16 rounded-md overflow-hidden 
	shadow-gray-400 dark:shadow-gray-700 shadow-sm"
      style={{ minHeight: '4rem' }}
    >
      <div className="h-full aspect-square bg-background_variant dark:bg-d-background_variant z-0">
        <img
          src={`/api/media/${data.media[0]}`}
          alt=""
          className="object-cover h-full"
        />
      </div>
      <div className="text-xs p-1 text-ellipsish whitespace-wrap ">
        {data.caption}
      </div>
    </div>
  );
};
export default SinglePostPrev;
