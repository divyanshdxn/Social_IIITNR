import React, { useEffect } from 'react';
import getMedia from '../../helpers/getMedia';
import useAppContext from '../../hooks/useAppContext';
import PostByUserResponse from '../../types/response/PostsByUserResponse';
import ModifyDeletePost from '../ModifyDeletePost';

interface Props {
  data: PostByUserResponse;
  isLoading?: boolean;
}
const SinglePostPrev: React.FC<Props> = ({ data, isLoading }) => {
  const { setIsModalOpen, setModalChildren } = useAppContext();
  useEffect(() => {}, [isLoading]);
  if (isLoading) return <span>Loading...</span>;
  const handleViewMore = () => {
    setIsModalOpen(true);
    setModalChildren(<ModifyDeletePost post={data} />);
  };
  return (
    <div
      className="flex w-full h-16 rounded-md overflow-hidden 
	shadow-gray-400 dark:shadow-gray-700 shadow-sm group 
  cursor-pointer items-center"
      style={{ minHeight: '4rem' }}
      onClick={handleViewMore}
    >
      <div
        className="h-full aspect-square bg-background_variant 
      dark:bg-d-background_variant z-0"
      >
        <img
          src={getMedia(data.media)[0].url}
          alt=""
          className="object-cover h-full w-full"
        />
      </div>
      <div className="text-xs px-1 py-2 text-ellipsish whitespace-wrap relative w-full h-full flex font-medium">
        {data.caption.substring(0, 50)}
        {data.caption.length > 50 && '...'}
        <div
          className="absolute w-full inset-0 h-full z-30 flex 
        justify-center items-center transition-opacity opacity-0 bg-primary 
        dark:bg-d-primary group-hover:opacity-90 text-white text-xs"
        >
          View Post
        </div>
      </div>
    </div>
  );
};
export default SinglePostPrev;
