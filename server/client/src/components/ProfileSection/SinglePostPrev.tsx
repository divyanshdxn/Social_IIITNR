import React, { useContext, useEffect } from 'react';
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
  const handleModify = () => {
    setIsModalOpen(true);
    setModalChildren(<ModifyDeletePost post={data} />);
  };
  return (
    <div
      className="flex w-full h-16 rounded-md overflow-hidden 
	shadow-gray-400 dark:shadow-gray-700 shadow-sm group relative"
      style={{ minHeight: '4rem' }}
    >
      <div
        className="h-full aspect-square bg-background_variant dark:bg-d-background_variant z-0 cursor-pointer"
        onClick={handleModify}
      >
        <img
          src={`/api/media/${data.media[0]}`}
          alt=""
          className="object-cover h-full"
        />
      </div>
      <div className="text-xs p-1 text-ellipsish whitespace-wrap ">
        {data.caption}
      </div>
      <div className="absolute w-full, h-full z-30"></div>
    </div>
  );
};
export default SinglePostPrev;
